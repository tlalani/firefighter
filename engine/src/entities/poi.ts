import { Entity, EntityType } from "./entity.js";

export interface POIEntity extends Entity {
    type: EntityType.POI;
    actual: string | undefined;
    revealed: boolean;
}