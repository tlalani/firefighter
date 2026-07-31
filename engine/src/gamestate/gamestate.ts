import { Board } from "../board/board.js";
import { EntityID, PlayerID } from "../board/ids.js";
import { Entity } from "../entities/entity.js";
import { Player } from "../player/player.js";

export interface GameState {
    board: Board;
    players: Record<PlayerID, Player>;
    entities: Record<EntityID, Entity>;
    currentPlayerTurn: PlayerID;
    nextEntityID: EntityID;
}