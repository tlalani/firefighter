import { Entity, EntityType } from "./entity";

export interface SmokeEntity extends Entity {
    type: EntityType.SMOKE;
}