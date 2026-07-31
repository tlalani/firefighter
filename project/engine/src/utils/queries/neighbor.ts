import { Direction } from "../../board/direction";
import { TileID } from "../../board/ids";
import { Tile } from "../../board/tile";
import { Entity } from "../../entities/entity";
import { GameState } from "../../gamestate/gamestate";
import { getXYFromDirection } from "./direction";
import { getTile } from "./tile";

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