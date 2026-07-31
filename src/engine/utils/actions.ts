import { Direction } from "../board/direction";
import { EdgeType } from "../board/edge";
import { EntityType } from "../entities/entity";
import { GameState } from "../gamestate/gamestate";
import { Player } from "../player/player";
import { canMove } from "./queries";
import { getEdge } from "./queries/edge";
import { getEntity, getPlayerEntity, hasEntity } from "./queries/entity";
import { getNeighborTile, getNeighborEntity } from "./queries/neighbor";
import { Action, ActionCost } from "./actions/actions.model";
import { dropEntity, pickupEntity, removeEntity } from "./actions/entity";
import { PlayerID } from "../board/ids";


export function performAction(state: GameState, player: Player, action: Action, dir: Direction | null) {
    switch (action) {
        case Action.Move:
        case Action.MoveFire:
        case Action.MoveVictimOrHazmat:
            if (!dir) return;
            if (canMove(state, player.tileID, dir)) {
                player.tileID = getNeighborTile(state, player.tileID, dir)!.id
                player.currentAP -= ActionCost[action]
            }
            break;
        case Action.Chop:
            if (!dir) return;
            chopEdge(state, player, dir);
            break;
        case Action.CloseDoor:
        case Action.OpenDoor:
            if (!dir) return;
            openOrCloseDoor(state, action, player, dir);
            break;
        case Action.ExtinguishFire:
            extinguishFire(state, player, dir);
            break;
        case Action.FireToSmoke:
            fireToSmoke(state, player, dir);
            break;
        case Action.ExtinguishSmoke:
            extinguishSmoke(state, player, dir);
            break;
        case Action.PickupFromGround:
            pickupFromGround(state, player);
            break;
        case Action.DropCarrying:
            dropCarrying(state, player);
            break;
        default:
            break;
    }
}

export function chopEdge(state: GameState, player: Player, dir: Direction) {
    const edge = getEdge(state, player.tileID, dir)!;
    if ('counters' in edge && edge.counters < 2) {
        edge.counters += 1;
        player.currentAP -= ActionCost.Chop;
        if (edge.counters === 2) {
            edge.isBroken = true;
        }
    } else {
        return;
    }
}

export function openOrCloseDoor(state: GameState, action: Action, player: Player, dir: Direction) {
    const edge = getEdge(state, player.tileID, dir)!;
    if ('open' in edge) {
        if (edge.open && action === Action.CloseDoor) {
            edge.open = false;
            player.currentAP -= ActionCost.CloseDoor;
        } else if (!edge.open && action === Action.OpenDoor) {
            edge.open = true;
            player.currentAP -= ActionCost.OpenDoor;
        } else {
            return;
        }

    }
}

export function extinguishFire(state: GameState, player: Player, dir: Direction | null) {
    if (!dir && hasEntity(state, player.tileID)) {
        const entity = getEntity(state, player.tileID);
        if (entity.type === EntityType.FIRE) {
            removeEntity(state, entity.id);
            player.currentAP -= ActionCost.ExtinguishFire;
        }
    } else if (dir) {
        const entity = getNeighborEntity(state, player.tileID, dir);
        if (!entity) return;
        if (entity.type === EntityType.FIRE) {
            removeEntity(state, entity.id);
            player.currentAP -= ActionCost.ExtinguishFire;
        }
    }
}

export function fireToSmoke(state: GameState, player: Player, dir: Direction | null) {
    if (!dir && hasEntity(state, player.tileID)) {
        const entity = getEntity(state, player.tileID);
        if (entity.type === EntityType.FIRE) {
            removeEntity(state, entity.id);
            player.currentAP -= ActionCost.FireToSmoke;
        }
    } else if (dir) {
        const entity = getNeighborEntity(state, player.tileID, dir);
        if (!entity) return;
        if (entity.type === EntityType.FIRE) {
            removeEntity(state, entity.id);
            player.currentAP -= ActionCost.FireToSmoke;
        }
    }
}

export function extinguishSmoke(state: GameState, player: Player, dir: Direction | null) {
    if (!dir && hasEntity(state, player.tileID)) {
        const entity = getEntity(state, player.tileID);
        if (entity.type === EntityType.SMOKE) {
            removeEntity(state, entity.id);
            player.currentAP -= ActionCost.ExtinguishSmoke;
        }
    } else if (dir) {
        const entity = getNeighborEntity(state, player.tileID, dir);
        if (!entity) return;
        if (entity.type === EntityType.SMOKE) {
            removeEntity(state, entity.id);
            player.currentAP -= ActionCost.ExtinguishSmoke;
        }
    }
}

export function pickupFromGround(state: GameState, playerID: PlayerID) {
    const player = state.players[playerID]!;
    const entity = getEntity(state, player.tileID)
    if (entity) pickupEntity(state, player.id, entity.id);
}

export function dropCarrying(state: GameState, player: Player) {
    const entity = getPlayerEntity(state, player.id);
    if (entity) dropEntity(state, player.id);
}