import { EdgeID, TileID } from "./ids.js";

export enum EdgeType {
    DOOR = "DOOR", WALL = "WALL"
}

export interface Edge {
    id: EdgeID;
    tileA: TileID;
    tileB: TileID;
    type: EdgeType;
    isBroken: boolean;
}

export interface DoorEdge extends Edge {
    type: EdgeType.DOOR;
    open: boolean;
}

export interface WallEdge extends Edge {
    type: EdgeType.WALL;
    counters: number;
}

export type BoardEdge = DoorEdge | WallEdge;