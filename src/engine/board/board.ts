import { BoardEdge } from "./edge";
import { Tile } from "./tile";


export interface Board {
    width: number;
    height: number;

    tiles: Tile[];
    edges: BoardEdge[];
}