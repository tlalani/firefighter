import { BoardEdge } from "./edge.js";
import { Tile } from "./tile.js";


export interface Board {
    width: number;
    height: number;

    tiles: Tile[];
    edges: BoardEdge[];
}