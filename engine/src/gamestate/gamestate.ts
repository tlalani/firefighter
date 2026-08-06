import { Board } from "../board/board.js";
import { EntityID, PlayerID, TileID } from "../board/ids.js";
import { Entity } from "../entities/entity.js";
import { Player } from "../player/player.js";

export interface GameState {
    board: Board;
    players: Record<PlayerID, Player> | null;
    entities: Record<EntityID, Entity> | null;
    currentPlayerTurn: PlayerID | null;
    nextEntityID: EntityID;
    startupTiles: TileID[];
}