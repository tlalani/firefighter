import { Board } from "./engine/board/board";
import { Edge, EdgeType, WallEdge, DoorEdge } from "./engine/board/edge";
import { tileID, roomID, edgeID, TileID } from "./engine/board/ids";
import * as map from '../src/map/board1.json'

const board: Board = {
    width: map.width,
    height: map.height,
    tiles: map.tiles.map(tile => ({ x: tile.x, y: tile.y, id: tileID(tile.id), room: roomID(tile.room), edges: {}, entity: null })),
    edges: map.edges.map(e => {
        const obj: Edge = { id: edgeID(e.id), tileA: e.tileA as TileID, tileB: e.tileB as TileID, type: e.type as EdgeType, isBroken: false };
        if (e.type === EdgeType.WALL) {
            (obj as WallEdge)['counters'] = 0;
            return obj as WallEdge
        } else {
            (obj as DoorEdge)['open'] = false;
            return obj as DoorEdge
        }
    })
};

function printBoard(board: Board): void {
    // Quick lookup by tile id
    const tileById = new Map(board.tiles.map(t => [t.id, t]));

    // Horizontal edges (between rows)
    const hEdges = new Map<string, Edge>();

    // Vertical edges (between columns)
    const vEdges = new Map<string, Edge>();

    for (const edge of board.edges) {
        const a = tileById.get(edge.tileA)!;
        const b = tileById.get(edge.tileB)!;

        if (a.y === b.y) {
            // Left/right neighbours -> vertical edge
            const x = Math.max(a.x, b.x);
            const y = a.y;
            vEdges.set(`${x},${y}`, edge);
        } else {
            // Top/bottom neighbours -> horizontal edge
            const x = a.x;
            const y = Math.max(a.y, b.y);
            hEdges.set(`${x},${y}`, edge);
        }
    }

    // Tile lookup by position
    const tileAt = new Map<string, typeof board.tiles[number]>();
    for (const tile of board.tiles) {
        tileAt.set(`${tile.x},${tile.y}`, tile);
    }

    for (let y = 0; y < board.height; y++) {
        // Tile row
        let line = "";
        for (let x = 0; x < board.width; x++) {
            const tile = tileAt.get(`${x},${y}`);

            if (!tile) {
                line += "   ";
            } else {
                line += String(tile.room).padStart(2, " ");
            }

            if (x < board.width - 1) {
                line += vEdges.has(`${x + 1},${y}`) ? (vEdges.get(`${x + 1},${y}`)?.type === EdgeType.WALL ? "|" : "\\") : " ";
            }
        }
        console.log(line);

        // Horizontal edges
        if (y < board.height - 1) {
            let edgeLine = "";
            for (let x = 0; x < board.width; x++) {
                edgeLine += hEdges.has(`${x},${y + 1}`) ? (hEdges.get(`${x},${y + 1}`)?.type === EdgeType.WALL ? "--" : "~~") : "  ";

                if (x < board.width - 1)
                    edgeLine += " ";
            }
            console.log(edgeLine);
        }
    }
}

printBoard(board);

//TODO: WRITE TESTS!!!!!