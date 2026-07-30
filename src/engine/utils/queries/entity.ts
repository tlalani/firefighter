import { EntityID, PlayerID, TileID } from "../../board/ids";
import { Entity, EntityType } from "../../entities/entity";
import { GameState } from "../../gamestate/gamestate";
import { getTile } from "./tile";
import { getNeighborTile } from "./neighbor";
import { Direction } from "../../board/direction";

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