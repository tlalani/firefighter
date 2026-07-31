import { Direction } from "../../board/direction.js";
import { TileID } from "../../board/ids.js";
import { Tile } from "../../board/tile.js";
import { Entity } from "../../entities/entity.js";
import { GameState } from "../../gamestate/gamestate.js";
import { getXYFromDirection } from "./direction.js";
import { getTile } from "./tile.js";

export function getNeighborTile(state: GameState, tileID: TileID, dir: Direction): Tile | null {
    const tile = getTile(state, tileID);
    const [x, y] = getXYFromDirection(tile.x, tile.y, dir);
    return state.board.tiles.find(tile => tile.x === x && tile.y === y) ?? null;
}

export function getNeighborEntity(state: GameState, tileID: TileID, dir: Direction): Entity | null {
    const neighbor = getNeighborTile(state, tileID, dir);
    if (!neighbor || !neighbor.entity) return null;

    return state.entities[neighbor.entity]!
}