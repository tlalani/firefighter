import { EntityID, PlayerID } from "../../board/ids";
import { GameState } from "../../gamestate/gamestate";
import { getEntity, isCarryable } from "../queries/entity";
import { whichPlayerCarryingEntity } from "../queries/player";
import { getTile } from "../queries/tile";

export function removeEntity(state: GameState, entityID: EntityID) {
    const entity = state.entities[entityID]!;
    if (entity.tileID) {
        const tile = getTile(state, entity.tileID);
        tile.entity = null;
    } else if (isCarryable(state, entity.id)) {
        const player = whichPlayerCarryingEntity(state, entity.id);
        if (player) {
            player.carryingEntityID = null;
        }
    }

    delete state.entities[entityID];
}

export function pickupEntity(state: GameState, playerID: PlayerID, entityID: EntityID) {
    const player = state.players[playerID]!
    const entity = state.entities[entityID];

    if (player.carryingEntityID || !entity || player.tileID !== entity.tileID) {
        return;
    }

    if (isCarryable(state, entityID)) {
        player.carryingEntityID = entityID;
        entity.tileID = null;
    }
}

export function dropEntity(state: GameState, playerID: PlayerID) {
    const player = state.players[playerID]!;
    const entityOnTile = getEntity(state, player.tileID);
    if (!player.carryingEntityID || entityOnTile) return;

    const tile = getTile(state, player.tileID);
    tile.entity = player.carryingEntityID;
    player.carryingEntityID = null;
}