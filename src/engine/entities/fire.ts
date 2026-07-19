import { Entity, EntityType } from "./entity";

export interface FireEntity extends Entity {
    type: EntityType.FIRE;
}