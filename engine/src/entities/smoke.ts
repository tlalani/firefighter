import { Entity, EntityType } from "./entity.js";

export interface SmokeEntity extends Entity {
    type: EntityType.SMOKE;
}