import { Direction } from "../board/direction.js";
import { EdgeType } from "../board/edge.js";
import { TileID } from "../board/ids.js";
import { EntityType } from "../entities/entity.js";
import { GameState } from "../gamestate/gamestate.js";
import { Player } from "../player/player.js";
import { Action, ActionCost, AvailableAction } from "./actions/actions.model.js";
import { canCrossEdge, getEdge } from "./queries/edge.js";
import { hasEntity, getEntity, isCarryable } from "./queries/entity.js";
import { getNeighborEntity, getNeighborTile } from "./queries/neighbor.js";
import { getTile } from "./queries/tile.js";

export function canMove(state: GameState, tileID: TileID, dir: Direction): boolean {

    const thisTile = getTile(state, tileID);
    const otherTile = getNeighborTile(state, tileID, dir);

    if (!otherTile || thisTile.edges[dir] && !canCrossEdge(state, thisTile.edges[dir])) return false;
    return true;
}

export function getAvailableActionsByDirection(state: GameState, dir: Direction) {
    if (!state.players || !state.currentPlayerTurn) throw new Error("Players not initialized");
    const possibleActions: AvailableAction[] = [];

    const player = state.players[state.currentPlayerTurn]!;

    possibleActions.push(..._getExtinguisActionsInDirection(state, player, dir));
    possibleActions.push(..._getMovementActionInDirection(state, player, dir));
    possibleActions.push(..._getWallOrDoorActionInDirection(state, player, dir));

    return possibleActions;
}

export function getAvailableActionsOnTile(state: GameState) {
    if (!state.players || !state.currentPlayerTurn) throw new Error("Players not initialized");
    const possibleActions: AvailableAction[] = [];

    const player = state.players[state.currentPlayerTurn]!;

    possibleActions.push(..._getExtinguishActionsOnTile(state, player));
    possibleActions.push(..._getPickupAndDropActionOnTile(state, player));

    return possibleActions;
}

function _getMovementActionInDirection(state: GameState, player: Player, dir: Direction): AvailableAction[] {
    if (!player.tileID) throw new Error("Player not on a tile");

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
    if (!player.tileID) throw new Error("Player not on a tile");

    const edge = getEdge(state, player.tileID, dir);
    if (edge) {
        if (edge.type === EdgeType.WALL && edge.counters < 2 && player.currentAP >= ActionCost.Chop) return [{ action: Action.Chop, direction: dir }];
        else if (edge.type === EdgeType.DOOR && !edge.isBroken && player.currentAP >= ActionCost.OpenDoor) {
            if (edge.open) return [{ action: Action.CloseDoor, direction: dir }];
            else return [{ action: Action.OpenDoor, direction: dir }];
        }
    }
    return [];
}

function _getExtinguisActionsInDirection(state: GameState, player: Player, dir: Direction): AvailableAction[] {
    if (!player.tileID) throw new Error("Player not on a tile");
    const entityOnNeighbor = getNeighborEntity(state, player.tileID, dir);
    if (!entityOnNeighbor) return [];
    if (!canMove(state, player.tileID, dir)) return []
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

function _getPickupAndDropActionOnTile(state: GameState, player: Player) {
    if (!player.tileID) throw new Error("Player not on a tile");
    const isPlayerCarryingSomething = !!player.carryingEntityID;
    if (isPlayerCarryingSomething) {
        return [{ action: Action.DropCarrying }];
    } else if (hasEntity(state, player.tileID)) {
        const tile = getTile(state, player.tileID);
        if (!isCarryable(state, tile.entity!)) return [];
        return [{ action: Action.PickupFromGround }];
    }
    return [];
}

function _getExtinguishActionsOnTile(state: GameState, player: Player): AvailableAction[] {
    if (!player.tileID) throw new Error("Player not on a tile");
    const entityOnTile = getEntity(state, player.tileID);
    if (entityOnTile) {
        if (entityOnTile.type === EntityType.FIRE) {
            if (player.currentAP >= ActionCost.ExtinguishFire) return [{ action: Action.ExtinguishFire }, { action: Action.FireToSmoke }];
            else if (player.currentAP >= ActionCost.FireToSmoke) return [{ action: Action.FireToSmoke }];
        } else if (entityOnTile.type === EntityType.SMOKE) {
            if (player.currentAP >= ActionCost.ExtinguishSmoke) return [{ action: Action.ExtinguishSmoke }];
        }
    }
    return [];

}