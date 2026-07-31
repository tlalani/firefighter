import { EntityID, PlayerID, TileID } from "../board/ids.js";

export interface Player {
    id: PlayerID
    tileID: TileID;
    //class: PlayerClass;
    currentAP: number;
    carryingEntityID: EntityID | null;
    turnStartAP: number;
}