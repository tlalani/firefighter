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
    return state.entities[tile.entity!]!;
}

export function isCarryable(state: GameState, entityID: EntityID) {
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
    const player = state.players[playerID]!;

    if (player.carryingEntityID) {
        return state.entities[player.carryingEntityID];
    }
    return null;
}