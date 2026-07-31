import { Direction } from "./direction.js";
import { EdgeID, EntityID, RoomID, TileID } from "./ids.js";

export interface Tile {
    id: TileID;
    room: RoomID;
    x: number;
    y: number;
    edges: Partial<Record<Direction, EdgeID>>;
    entity: EntityID | null;
}