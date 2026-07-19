import { Direction } from "../../board/direction";
import { TileID } from "../../board/ids";
import { Tile } from "../../board/tile";
import { GameState } from "../../gamestate/gamestate";
import { getEdge } from "./edge";
import { getTile } from "./tile";

export function hasNeighborTile(state: GameState, tileID: TileID, dir: Direction): boolean {
    const edge = getEdge(state, tileID, dir);
    return !!edge;
}

export function getNeighborTile(state: GameState, tileID: TileID, dir: Direction): Tile | null {
    if (!hasNeighborTile(state, tileID, dir)) return null;

    const edge = getEdge(state, tileID, dir);
    if (!edge) return null;
    const otherTileID = edge.tileA === tileID ? edge.tileB : edge.tileA;
    const otherTile = getTile(state, otherTileID);
    return otherTile;
}

export function getNeighborEntity(state: GameState, tileID: TileID, dir: Direction): Entity | null {
    const neighbor = getNeighborTile(state, tileID, dir);
    if (!neighbor || !neighbor.entity) return null;

    return state.entities[neighbor.entity]!
}