import { Board } from "../board/board.js";
import { Edge, EdgeType, WallEdge, DoorEdge } from "../board/edge.js";
import { tileID, roomID, edgeID, TileID, EntityID, PlayerID, entityID, playerID } from "../board/ids.js";
import { Entity, EntityType } from "../entities/entity.js";
import { GameState } from "../gamestate/gamestate.js";
import { Player } from "../player/player.js";
import { getDirection, opposite } from "./queries/direction.js";


export interface SetupTiles { x: number, y: number, room: number, id: number };
export interface SetupEdge { tileA: number, tileB: number, id: number, type: string, open?: boolean };
export interface SetupEntity { id: number, tileID: number, type: string };
export interface SetupPlayer { id: number, tileID: number | null, name: string };

export function generateBoard(width: number, height: number, tiles: { x: number, y: number, room: number, id: number }[], edges: { tileA: number, tileB: number, id: number, type: string, open?: boolean }[]) {
    const board: Board = {
        width: width,
        height: height,
        tiles: tiles.map(tile => ({ x: tile.x, y: tile.y, id: tileID(tile.id), room: roomID(tile.room), edges: {}, entity: null })).sort((a, b) => a.x - b.x || a.y - b.y),
        edges: edges.map(e => {
            const obj: Edge = { id: edgeID(e.id), tileA: e.tileA as TileID, tileB: e.tileB as TileID, type: e.type as EdgeType, isBroken: false };

            if (e.type === EdgeType.WALL) {
                (obj as WallEdge).counters = 0;
                return obj as WallEdge
            } else {
                (obj as DoorEdge).open = e.open ?? false;
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

export function generateGameState(width: number, height: number, tiles: { x: number, y: number, room: number, id: number }[], edges: { tileA: number, tileB: number, id: number, type: string, open?: boolean }[], entities: { id: number, tileID: number, type: string }[], players: { id: number, tileID: number, name: string }[]) {
    const board = generateBoard(width, height, tiles, edges);
    entities.forEach(entity => board.tiles.find(tile => tile.id === tileID(entity.tileID))!.entity = entityID(entity.id));
    const lastEntityID = entities.sort((a, b) => a.id - b.id)[-1]?.id;
    const state: GameState = {
        board,
        entities: entities.reduce<Record<EntityID, Entity>>((obj, entity) => {
            obj[entityID(entity.id)] = { id: entityID(entity.id), type: entity.type as EntityType, tileID: tileID(entity.tileID) };
            return obj
        }, {}),
        players: players.reduce<Record<PlayerID, Player>>((obj, player) => {
            obj[playerID(player.id)] = { id: playerID(player.id), tileID: tileID(player.tileID), currentAP: 0, carryingEntityID: null, turnStartAP: 4, name: player.name };
            return obj;
        }, {}),
        currentPlayerTurn: playerID(players[0]!.id),
        nextEntityID: entityID((lastEntityID ?? 0) + 1)
    };

    return state;
}