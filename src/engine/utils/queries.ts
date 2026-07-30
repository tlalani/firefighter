import { Board } from "../board/board";
import { Direction } from "../board/direction";
import { Edge, EdgeType } from "../board/edge";
import { TileID } from "../board/ids";
import { EntityType } from "../entities/entity";
import { GameState } from "../gamestate/gamestate";
import { Player } from "../player/player";
import { Action, ActionCost, AvailableAction } from "./actions/actions.model";
import { canCrossEdge, getEdge } from "./queries/edge";
import { hasEntity, getEntity } from "./queries/entity";
import { getNeighborEntity, getNeighborTile } from "./queries/neighbor";
import { getTile } from "./queries/tile";

export function canMove(state: GameState, tileID: TileID, dir: Direction): boolean {

    const thisTile = getTile(state, tileID);
    const otherTile = getNeighborTile(state, tileID, dir);

    if (!otherTile || thisTile.edges[dir] && !canCrossEdge(state, thisTile.edges[dir])) return false;
    return true;
}

export function getAvailableActionsByDirection(state: GameState, dir: Direction) {

    const possibleActions: AvailableAction[] = [];

    const player = state.players[state.currentPlayerTurn]!;

    possibleActions.push(..._getExtinguisActionsInDirection(state, player, dir));
    possibleActions.push(..._getMovementActionInDirection(state, player, dir));
    possibleActions.push(..._getWallOrDoorActionInDirection(state, player, dir));

    return possibleActions;
}

function _getMovementActionInDirection(state: GameState, player: Player, dir: Direction): AvailableAction[] {
    if (canMove(state, player.tileID, dir)) {
        const fireOnNeighbor = getNeighborEntity(state, player.tileID, dir)?.type === EntityType.FIRE;
        const isPlayerCarryingSomething = !!player.carryingEntityID;

        if (fireOnNeighbor && !isPlayerCarryingSomething && player.currentAP >= ActionCost.MoveFire + 1) {
            return [{ action: Action.MoveFire, direction: dir }];
        }
        else if (isPlayerCarryingSomething && !fireOnNeighbor && player.currentAP >= ActionCost.MoveVictimOrHazmat) {
            return [{ action: Action.MoveVictimOrHazmat, direction: dir }];
        }
        else if (!fireOnNeighbor && !isPlayerCarryingSomething && player.currentAP >= ActionCost.Move) {
            return [{ action: Action.Move, direction: dir }];
        }
    }
    return [];
}

function _getWallOrDoorActionInDirection(state: GameState, player: Player, dir: Direction): AvailableAction[] {
    const edge = getEdge(state, player.tileID, dir);
    if (edge) {
        if (edge.type === EdgeType.WALL) return [{ action: Action.Chop, direction: dir }];
        else if (edge.type === EdgeType.DOOR) {
            if (edge.open) return [{ action: Action.CloseDoor, direction: dir }];
            else return [{ action: Action.OpenDoor, direction: dir }];
        }
    }
    return [];
}

function _getExtinguisActionsInDirection(state: GameState, player: Player, dir: Direction): AvailableAction[] {
    const entityOnNeighbor = getNeighborEntity(state, player.tileID, dir);
    if (!entityOnNeighbor) return [];

    switch (entityOnNeighbor.type) {
        case EntityType.FIRE:
            if (player.currentAP < ActionCost.FireToSmoke) return [];
            if (player.currentAP < ActionCost.ExtinguishFire) return [{ action: Action.FireToSmoke, direction: dir }]
            return [{ action: Action.ExtinguishFire, direction: dir }, { action: Action.FireToSmoke, direction: dir }];
        case EntityType.SMOKE:
            if (player.currentAP < ActionCost.ExtinguishSmoke) return [];
            return [{ action: Action.ExtinguishSmoke, direction: dir }];
        default:
            return [];
    }
}

export function getPickupAndDropActionOnTile(state: GameState, player: Player) {
    const isPlayerCarryingSomething = !!player.carryingEntityID;
    if (isPlayerCarryingSomething) {
        return [{ action: Action.DropCarrying }];
    } else if (hasEntity(state, player.tileID)) {
        return [{ action: Action.PickupFromGround }];
    }
    return [];
}

export function getExtinguishActionsOnTile(state: GameState, player: Player): AvailableAction[] {

    const entityOnTile = getEntity(state, player.tileID);
    if (entityOnTile) {
        if (entityOnTile.type === EntityType.FIRE) {
            if (player.currentAP >= ActionCost.ExtinguishFire) return [{ action: Action.ExtinguishFire }, { action: Action.FireToSmoke }];
        } else if (entityOnTile.type === EntityType.SMOKE) {
            if (player.currentAP >= ActionCost.ExtinguishSmoke) return [{ action: Action.ExtinguishSmoke }];
        }
    }
    return [];

}

export function printBoard(board: Board): void {
    // Quick lookup by tile id
    const tileById = new Map(board.tiles.map(t => [t.id, t]));

    // Horizontal edges (between rows)
    const hEdges = new Map<string, Edge>();

    // Vertical edges (between columns)
    const vEdges = new Map<string, Edge>();

    for (const edge of board.edges) {
        const a = tileById.get(edge.tileA)!;
        const b = tileById.get(edge.tileB)!;

        if (a.y === b.y) {
            // Left/right neighbours -> vertical edge
            const x = Math.max(a.x, b.x);
            const y = a.y;
            vEdges.set(`${x},${y}`, edge);
        } else {
            // Top/bottom neighbours -> horizontal edge
            const x = a.x;
            const y = Math.max(a.y, b.y);
            hEdges.set(`${x},${y}`, edge);
        }
    }

    // Tile lookup by position
    const tileAt = new Map<string, typeof board.tiles[number]>();
    for (const tile of board.tiles) {
        tileAt.set(`${tile.x},${tile.y}`, tile);
    }

    for (let y = 0; y < board.height; y++) {
        // Tile row
        let line = "";
        for (let x = 0; x < board.width; x++) {
            const tile = tileAt.get(`${x},${y}`);

            if (!tile) {
                line += "   ";
            } else {
                line += String(tile.room).padStart(2, " ");
            }

            if (x < board.width - 1) {
                line += vEdges.has(`${x + 1},${y}`) ? (vEdges.get(`${x + 1},${y}`)?.type === EdgeType.WALL ? "|" : "\\") : " ";
            }
        }
        console.log(line);

        // Horizontal edges
        if (y < board.height - 1) {
            let edgeLine = "";
            for (let x = 0; x < board.width; x++) {
                edgeLine += hEdges.has(`${x},${y + 1}`) ? (hEdges.get(`${x},${y + 1}`)?.type === EdgeType.WALL ? "--" : "~~") : "  ";

                if (x < board.width - 1)
                    edgeLine += " ";
            }
            console.log(edgeLine);
        }
    }
}
