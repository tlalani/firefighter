import { Direction } from "../board/direction";
import { EdgeType } from "../board/edge";
import { edgeID, playerID, roomID, tileID } from "../board/ids";
import { GameState, generateGameState } from "../gamestate/gamestate";
import { getAvailableActionsByDirection, printBoard } from "../utils/queries";
import { describe, expect, it, test } from 'vitest';
import { getTile } from "../utils/queries/tile";
import { Action } from "../utils/actions/actions.model";


describe('initial tests', () => {
    const tiles = [
        { x: 0, y: 0, id: tileID(1), room: roomID(1) },
        { x: 0, y: 1, id: tileID(2), room: roomID(1) },
    ];

    const edges = [
        { id: edgeID(1), tileA: tileID(1), tileB: tileID(2), type: EdgeType.WALL },
    ]

    const gameState: GameState = generateGameState(1, 2, tiles, edges, [], [{ id: playerID(1), tileID: tileID(2), currentAP: 4, turnStartAP: 4, carryingEntityID: null }]);

    it('should generate the correct board', () => {
        const playerTileID = gameState.players[gameState.currentPlayerTurn]!.tileID
        const tile = getTile(gameState, playerTileID);

        printBoard(gameState.board);

        expect(tile.edges[Direction.N]).toBeTruthy();
    });

    it('should get chop action in Direction', () => {
        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.Chop);
    })
})