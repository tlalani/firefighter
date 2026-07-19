import { Direction } from "./direction";
import { EdgeID, EntityID, RoomID, TileID } from "./ids";

export interface Tile {
    id: TileID;
    room: RoomID;
    x: number;
    y: number;
    edges: Partial<Record<Direction, EdgeID>>;
    entity: EntityID | null;
}