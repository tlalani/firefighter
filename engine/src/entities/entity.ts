import { EntityID, TileID } from "../board/ids.js";

export enum EntityType {
    POI = "POI", CHEMICAL = "CHEM", FIRE = "FIRE", SMOKE = "SMOKE"
}

export interface Entity {
    id: EntityID;
    tileID: TileID | null;
    type: EntityType;
}