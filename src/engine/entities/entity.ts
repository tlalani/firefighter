import { EntityID, TileID } from "../board/ids";

export enum EntityType {
    POI, CHEMICAL, FIRE, SMOKE
}

export interface Entity {
    id: EntityID;
    tileID: TileID | null;
    type: EntityType;
}