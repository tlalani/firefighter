import { Direction } from "../../board/direction";
import { BoardEdge, Edge, EdgeType } from "../../board/edge";
import { TileID, EdgeID } from "../../board/ids";
import { GameState } from "../../gamestate/gamestate";
import { getTile } from "./tile";

export function hasEdge(state: GameState, tileID: TileID, dir: Direction): boolean {
    return !!getTile(state, tileID).edges[dir]
}

export function getEdge(state: GameState, tileID: TileID, dir: Direction): BoardEdge | null {
    if (hasEdge(state, tileID, dir)) {
        const edgeID = getTile(state, tileID).edges[dir]!;
        return state.board.edges[edgeID]!
    } else {
        return null;
    }
}

export function canCrossEdge(state: GameState, edgeID: EdgeID): boolean {
    const edge = state.board.edges[edgeID];
    if (!edge) return false;
    return edge.type !== EdgeType.WALL && !(edge.type === EdgeType.DOOR && !edge.open)
}