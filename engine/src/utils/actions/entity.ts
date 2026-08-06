import { entityID, EntityID, PlayerID, TileID } from "../../board/ids.js";
import { Entity, EntityType } from "../../entities/entity.js";
import { GameState } from "../../gamestate/gamestate.js";
import { getEntity, isCarryable } from "../queries/entity.js";
import { whichPlayerCarryingEntity } from "../queries/player.js";
import { getTile } from "../queries/tile.js";

export function removeEntity(state: GameState, entityID: EntityID) {
    if (!state.entities) throw new Error("Entities not initialized");
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

export function addEntity(state: GameState, type: EntityType, tileID: TileID) {
    if (!state.entities) throw new Error("Entities not initialized");
    const entity: Entity = { id: state.nextEntityID, type, tileID: tileID };
    state.nextEntityID = entityID(state.nextEntityID + 1);
    state.entities[entity.id] = entity;
    state.board.tiles.find(tile => tile.id === tileID)!.entity = entity.id;
}

export function pickupEntity(state: GameState, playerID: PlayerID, entityID: EntityID) {
    if (!state.players || !state.entities) throw new Error("players or entities not initialized");
    const player = state.players[playerID]!
    const entity = state.entities[entityID];
    if (player.carryingEntityID || !entity || player.tileID !== entity.tileID) {
        return;
    }
    if (!entity.tileID) throw new Error("Entity has no tile ID");
    
    if (isCarryable(state, entityID)) {
        player.carryingEntityID = entityID;
        const tile = getTile(state, entity.tileID)
        tile.entity = null;
        entity.tileID = null;
    }
}

export function dropEntity(state: GameState, playerID: PlayerID) {
    if (!state.players) throw new Error("players not initialized");
    const player = state.players[playerID]!;
    if (!player.tileID) throw new Error("Player not on a tile");
    const entityOnTile = getEntity(state, player.tileID);
    if (!player.carryingEntityID || entityOnTile) return;

    const tile = getTile(state, player.tileID);
    tile.entity = player.carryingEntityID;
    player.carryingEntityID = null;
}