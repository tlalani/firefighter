import { Direction } from "../../board/direction";
import { BoardEdge, Edge, EdgeType } from "../../board/edge";
import { TileID, EdgeID } from "../../board/ids";
import { GameState } from "../../gamestate/gamestate";
import { getTile } from "./tile";

export function getEdge(state: GameState, tileID: TileID, dir: Direction): BoardEdge | null {
    const edgeID = getTile(state, tileID).edges[dir];
    if (!edgeID) return null;
    return state.board.edges.find(edge => edge.id === edgeID)!;
}

export function canCrossEdge(state: GameState, edgeID: EdgeID): boolean {
    const edge = state.board.edges.find(edge => edge.id === edgeID);
    if (!edge) return false;
    return edge.type !== EdgeType.WALL && !(edge.type === EdgeType.DOOR && !edge.open)
}