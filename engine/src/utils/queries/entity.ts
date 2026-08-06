import { EntityID, PlayerID, TileID } from "../../board/ids.js";
import { Entity, EntityType } from "../../entities/entity.js";
import { GameState } from "../../gamestate/gamestate.js";
import { getTile } from "./tile.js";

export function hasEntity(state: GameState, tileID: TileID): boolean {
    const tile = getTile(state, tileID);
    return !!tile.entity
}

export function getEntity(state: GameState, tileID: TileID): Entity {
    const tile = getTile(state, tileID);
    if (!state.entities) throw new Error("Entities not Initialized");
    return state.entities[tile.entity!]!;
}

export function isCarryable(state: GameState, entityID: EntityID) {
    if (!state.entities) throw new Error("Entities not initialized");
    const entity = state.entities[entityID]!;
    switch (entity.type) {
        case EntityType.POI:
        case EntityType.CHEMICAL:
            return true;
        case EntityType.FIRE:
        case EntityType.SMOKE:
            return false;
    }
}

export function getPlayerEntity(state: GameState, playerID: PlayerID) {
    if (!state.players || !state.entities) throw new Error("Players or Entities not initialized");
    const player = state.players[playerID]!;

    if (player.carryingEntityID) {
        return state.entities[player.carryingEntityID];
    }
    return null;
}