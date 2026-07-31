import { Direction } from "../../board/direction";
import { BoardEdge, DoorEdge, Edge, EdgeType, WallEdge } from "../../board/edge";
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
    if (edge.type === EdgeType.WALL) {
        return _canCrossWallEdge(edge);
    } else {
        return _canCrossDoorEdge(edge);
    }
}

function _canCrossWallEdge(edge: WallEdge) {
    return edge.counters === 2;
}

function _canCrossDoorEdge(edge: DoorEdge) {
    return edge.open || edge.isBroken;
}