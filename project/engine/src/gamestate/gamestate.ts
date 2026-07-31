import { Board } from "../board/board";
import { EntityID, PlayerID } from "../board/ids";
import { Entity } from "../entities/entity";
import { Player } from "../player/player";

export interface GameState {
    board: Board;
    players: Record<PlayerID, Player>;
    entities: Record<EntityID, Entity>;
    currentPlayerTurn: PlayerID;
    nextEntityID: EntityID;
}