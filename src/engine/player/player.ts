import { EntityID, PlayerID, TileID } from "../board/ids";
import { ChemicalEntity } from "../entities/chemical";
import { POIEntity } from "../entities/poi";
import { PlayerClass } from "./playerclass";

export interface Player {
    id: PlayerID
    tileID: TileID;
    //class: PlayerClass;
    currentAP: number;
    carryingEntityID: EntityID | null;
    turnStartAP: number;
}