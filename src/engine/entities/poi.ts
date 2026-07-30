import { PlayerID } from "../board/ids";
import { Entity, EntityType } from "./entity";

export interface POIEntity extends Entity {
    type: EntityType.POI;
    actual: string | undefined;
    revealed: boolean;
}