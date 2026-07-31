import { TileID } from "../../board/ids.js";
import { Tile } from "../../board/tile.js";
import { GameState } from "../../gamestate/gamestate.js";

export function getTile(state: GameState, tileID: TileID): Tile {
    return state.board.tiles.find(tile => tile.id === tileID)!;
}
