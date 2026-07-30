import { getDirection, opposite } from "../utils/queries/direction";
import { BoardEdge, DoorEdge, Edge, EdgeType, WallEdge } from "./edge";
import { tileID, roomID, edgeID, TileID } from "./ids";
import { Tile } from "./tile";


export interface Board {
    width: number;
    height: number;

    tiles: Tile[];
    edges: BoardEdge[];
}