import { TileID } from "../../board/ids";
import { Tile } from "../../board/tile";
import { GameState } from "../../gamestate/gamestate";

export function getTile(state: GameState, tileID: TileID): Tile {
    return state.board.tiles[tileID]!;
}
