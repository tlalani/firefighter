import { Board } from "../board/board";
import { Edge, EdgeType, WallEdge, DoorEdge } from "../board/edge";
import { edgeID, entityID, EntityID, PlayerID, roomID, TileID, tileID } from "../board/ids";
import { Entity } from "../entities/entity";
import { Player } from "../player/player";
import { getDirection, opposite } from "../utils/queries/direction";

export interface GameState {
    board: Board;
    players: Record<PlayerID, Player>;
    entities: Record<EntityID, Entity>;
    currentPlayerTurn: PlayerID;
    nextEntityID: EntityID;
}

export function generateBoard(width: number, height: number, tiles: { x: number, y: number, room: number, id: number }[], edges: { tileA: number, tileB: number, id: number, type: string }[]) {
    const board: Board = {
        width: width,
        height: height,
        tiles: tiles.map(tile => ({ x: tile.x, y: tile.y, id: tileID(tile.id), room: roomID(tile.room), edges: {}, entity: null })).sort((a, b) => a.x - b.x || a.y - b.y),
        edges: edges.map(e => {
            const obj: Edge = { id: edgeID(e.id), tileA: e.tileA as TileID, tileB: e.tileB as TileID, type: e.type as EdgeType, isBroken: false };

            if (e.type === EdgeType.WALL) {
                (obj as WallEdge)['counters'] = 0;
                return obj as WallEdge
            } else {
                (obj as DoorEdge)['open'] = false;
                return obj as DoorEdge
            }
        }).sort((a, b) => a.tileA - b.tileA || a.tileB - b.tileB)
    };

    board.edges.forEach(edge => {
        const tileA = board.tiles.find(tile => tile.id === edge.tileA)!;
        const tileB = board.tiles.find(tile => tile.id === edge.tileB)!;

        const dirFromA = getDirection(tileA, tileB);
        const dirFromB = opposite(dirFromA);

        tileA.edges[dirFromA] = edge.id;
        tileB.edges[dirFromB] = edge.id;
    });

    return board;
}

export function generateGameState(width: number, height: number, tiles: { x: number, y: number, room: number, id: number }[], edges: { tileA: number, tileB: number, id: number, type: string }[], entities: Entity[], players: Player[]) {
    const board = generateBoard(width, height, tiles, edges);
    entities.forEach(entity => board.tiles.find(tile => tile.id === entity.tileID)!.entity = entity.id);
    const lastEntityID = entities.sort((a, b) => a.id - b.id)[-1]?.id;
    const state: GameState = {
        board,
        entities: entities.reduce<Record<EntityID, Entity>>((obj, entity) => {
            obj[entity.id] = entity;
            return obj
        }, {}),
        players: players.reduce<Record<PlayerID, Player>>((obj, player) => {
            obj[player.id] = player;
            return obj;
        }, {}),
        currentPlayerTurn: players[0]!.id,
        nextEntityID: entityID((lastEntityID ?? 0) + 1)
    };

    return state;
}