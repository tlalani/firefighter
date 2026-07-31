import { Entity, EntityType } from "./entity.js";

export interface ChemicalEntity extends Entity {
    type: EntityType.CHEMICAL;
}