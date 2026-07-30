import { Direction } from "../board/direction";
import { EdgeType } from "../board/edge";
import { edgeID, entityID, playerID, roomID, tileID } from "../board/ids";
import { Entity, EntityType } from '../entities/entity';
import { GameState, generateGameState } from "../gamestate/gamestate";
import { printBoard } from "../utils/queries";
import { expect, test } from 'vitest';
import { getTile } from "../utils/queries/tile";
import { getNeighborEntity } from "../utils/queries/neighbor";

const entities: Entity[] = [
    { id: entityID(1), tileID: tileID(6), type: EntityType.FIRE },
    { id: entityID(2), tileID: tileID(2), type: EntityType.SMOKE }
]
const tiles = [
    { x: 0, y: 0, id: tileID(1), room: roomID(1) },
    { x: 0, y: 1, id: tileID(2), room: roomID(1) },
    { x: 0, y: 2, id: tileID(3), room: roomID(1) },
    { x: 1, y: 0, id: tileID(4), room: roomID(1) },
    { x: 1, y: 1, id: tileID(5), room: roomID(1) },
    { x: 1, y: 2, id: tileID(6), room: roomID(1) },
    { x: 2, y: 0, id: tileID(7), room: roomID(1) },
    { x: 2, y: 1, id: tileID(8), room: roomID(1) },
    { x: 2, y: 2, id: tileID(9), room: roomID(1) },
];

const edges = [
    { id: edgeID(1), tileA: tileID(4), tileB: tileID(5), type: EdgeType.WALL },
    { id: edgeID(2), tileA: tileID(5), tileB: tileID(8), type: EdgeType.DOOR },
]

const gameState: GameState = generateGameState(3, 3, tiles, edges, entities, [{ id: playerID(1), tileID: tileID(5), currentAP: 4, turnStartAP: 4, carryingEntityID: null }])

test('generateBoard', () => {
    const playerTileID = gameState.players[gameState.currentPlayerTurn]!.tileID
    const tile = getTile(gameState, playerTileID);

    printBoard(gameState.board);

    expect(tile.edges[Direction.N]).toBeTruthy();
    expect(tile.edges[Direction.E]).toBeTruthy();

    const entity = getNeighborEntity(gameState, playerTileID, Direction.S);
    expect(entity?.type).toBe(EntityType.FIRE);

    const entity1 = getNeighborEntity(gameState, playerTileID, Direction.W);
    expect(entity1?.type).toBe(EntityType.SMOKE);
})