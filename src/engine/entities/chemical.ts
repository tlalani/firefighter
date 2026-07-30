import { PlayerID } from "../board/ids";
import { Entity, EntityType } from "./entity";

export interface ChemicalEntity extends Entity {
    type: EntityType.CHEMICAL;
}