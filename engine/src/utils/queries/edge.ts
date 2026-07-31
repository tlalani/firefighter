import { Direction } from "../../board/direction.js";
import { BoardEdge, DoorEdge, EdgeType, WallEdge } from "../../board/edge.js";
import { TileID, EdgeID } from "../../board/ids.js";
import { GameState } from "../../gamestate/gamestate.js";
import { getTile } from "./tile.js";

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