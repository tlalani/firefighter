import { Board } from "../board/board";
import { Edge, EdgeType } from "../board/edge";
import { edgeID, roomID, tileID } from "../board/ids";
import { Tile } from "../board/tile";

const tiles: Tile[] = [
    { x: 0, y: 0, id: tileID(1), room: roomID(1), edges: {}, entity: null },
    { x: 0, y: 1, id: tileID(2), room: roomID(1), edges: {}, entity: null },
    { x: 0, y: 2, id: tileID(3), room: roomID(1), edges: {}, entity: null },
    { x: 1, y: 0, id: tileID(4), room: roomID(1), edges: {}, entity: null },
    { x: 1, y: 1, id: tileID(5), room: roomID(1), edges: {}, entity: null },
    { x: 1, y: 2, id: tileID(6), room: roomID(1), edges: {}, entity: null },
    { x: 2, y: 0, id: tileID(7), room: roomID(1), edges: {}, entity: null },
    { x: 2, y: 1, id: tileID(8), room: roomID(1), edges: {}, entity: null },
    { x: 2, y: 2, id: tileID(9), room: roomID(1), edges: {}, entity: null },
];

const edges: Edge[] = [
    { id: edgeID(1), tileA: tileID(2), tileB: tileID(5), type: EdgeType.WALL, isBroken: false },
    { id: edgeID()}
]
const board: Board = {
    width: 3,
    height: 3,
    tiles: [],
    edges: []
}