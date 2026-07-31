import { Entity, EntityType } from "./entity.js";

export interface FireEntity extends Entity {
    type: EntityType.FIRE;
}