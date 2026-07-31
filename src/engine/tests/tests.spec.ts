import { Direction } from "../board/direction";
import { DoorEdge, EdgeType } from "../board/edge";
import { edgeID, entityID, playerID, roomID, tileID } from "../board/ids";
import { GameState, generateGameState } from "../gamestate/gamestate";
import { getAvailableActionsByDirection, getAvailableActionsOnTile } from "../utils/queries";
import { describe, expect, it } from 'vitest';
import { getTile } from "../utils/queries/tile";
import { Action } from "../utils/actions/actions.model";
import { EntityType } from "../entities/entity";
import { addEntity, removeEntity } from "../utils/actions/entity";
import { getNeighborEntity } from "../utils/queries/neighbor";
import { getEntity } from "../utils/queries/entity";
import { POIEntity } from "../entities/poi";
import { pickupFromGround } from "../utils/actions";

const width = 1;
const height = 2;
const tiles = [
    { x: 0, y: 0, id: tileID(1), room: roomID(1) },
    { x: 0, y: 1, id: tileID(2), room: roomID(1) },
];

const edges = [
    { id: edgeID(1), tileA: tileID(1), tileB: tileID(2), type: EdgeType.WALL },
]

const entities = [
    { id: entityID(1), tileID: tileID(1), type: EntityType.FIRE }
];

const players = [{ id: playerID(1), tileID: tileID(2), currentAP: 4, turnStartAP: 4, carryingEntityID: null }];

describe('boardGen and Wall Chop', () => {

    const gameState: GameState = generateGameState(width, height, tiles, edges, [], players);

    it('should generate the correct board', () => {
        const playerTileID = gameState.players[gameState.currentPlayerTurn]!.tileID
        const tile = getTile(gameState, playerTileID);

        //printBoard(gameState.board);

        expect(tile.edges[Direction.N]).toBeTruthy();
    });

    it('should get chop action in Direction', () => {
        gameState.board.edges[0]! = { id: edgeID(1), tileA: tileID(1), tileB: tileID(2), type: EdgeType.WALL, counters: 0, isBroken: false }

        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.Chop);
    });


    it('should get open action in direction', () => {
        gameState.board.edges[0]! = { id: edgeID(1), tileA: tileID(1), tileB: tileID(2), type: EdgeType.DOOR, open: false, isBroken: false }
        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.OpenDoor);

        (gameState.board.edges[0]! as DoorEdge).open = true;
        actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(2);
        expect(actions.find(action => action.action === Action.Move)).toBeTruthy();
        expect(actions.find(action => action.action === Action.CloseDoor)).toBeTruthy();
    });

    it('should get walk action when wall broken', () => {
        gameState.board.edges[0]! = { id: edgeID(1), tileA: tileID(1), tileB: tileID(2), type: EdgeType.WALL, counters: 2, isBroken: true }
        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.Move)
    });

    it('should only get move action when door is broken', () => {
        gameState.board.edges[0]! = { id: edgeID(1), tileA: tileID(1), tileB: tileID(2), type: EdgeType.DOOR, open: false, isBroken: true }
        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.Move);
    })

    it('shouldnt have actions where tiles dont exist', () => {
        let actions = [...getAvailableActionsByDirection(gameState, Direction.S), ...getAvailableActionsByDirection(gameState, Direction.E), ...getAvailableActionsByDirection(gameState, Direction.W)];
        expect(actions.length).toBe(0);
    })
});

describe('Fire and Smoke', () => {
    const gameState: GameState = generateGameState(width, height, tiles, [], entities, players);

    it('should get all actions when player AP > 3', () => {
        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(3);
        expect(actions.find(action => action.action === Action.FireToSmoke)).toBeTruthy();
        expect(actions.find(action => action.action === Action.ExtinguishFire)).toBeTruthy();
        expect(actions.find(action => action.action === Action.MoveFire)).toBeTruthy();
    });

    it('should only get FireToSmoke if player AP < 2', () => {
        gameState.players[gameState.currentPlayerTurn]!.currentAP = 1;
        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.FireToSmoke);
    })

    it('should remove entity from in front of player', () => {
        removeEntity(gameState, entityID(1));
        let neighbor = getNeighborEntity(gameState, gameState.players[playerID(1)]!.tileID, Direction.N);
        expect(neighbor).toBeFalsy();
    });

    it('should add entity on top of player', () => {
        addEntity(gameState, EntityType.FIRE, tileID(2));
        let entity = getEntity(gameState, tileID(2));
        expect(entity).toBeTruthy();
        expect(entity.type).toBe(EntityType.FIRE);
    });

    it('should give tile actions', () => {
        gameState.players[gameState.currentPlayerTurn]!.currentAP = 4;
        let actions = getAvailableActionsOnTile(gameState);
        expect(actions.length).toBe(2);
        expect(actions.find(action => action.direction)).toBeFalsy();
        expect(actions.find(action => action.action === Action.FireToSmoke)).toBeTruthy();
        expect(actions.find(action => action.action === Action.ExtinguishFire)).toBeTruthy();
    });

    it('should give pickup and drop actions when pickupable item', () => {
        gameState.entities[entityID(1)] = ({ id: entityID(1), tileID: tileID(2), type: EntityType.POI, revealed: true, actual: 'Sonya' } as POIEntity);
        let actions = getAvailableActionsOnTile(gameState);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.PickupFromGround)
    })

    it('should pickup carryable', () => {
        pickupFromGround(gameState, gameState.currentPlayerTurn);
        let actions = getAvailableActionsOnTile(gameState);
        expect(actions.length).toBe(1);
        expect(actions[0]?.action).toBe(Action.DropCarrying);
        expect(gameState.players[gameState.currentPlayerTurn]?.carryingEntityID).toBeTruthy();
        expect(getTile(gameState, gameState.players[gameState.currentPlayerTurn]!.tileID).entity).toBeFalsy();
    });

    it('should not be able to move fire when carrying entity', () => {
        const ent = [...entities, ({ id: entityID(2), tileID: tileID(2), type: EntityType.POI, revealed: true, actual: 'Sonya' } as POIEntity)]
        const gameState: GameState = generateGameState(width, height, tiles, [], ent, players);
        pickupFromGround(gameState, gameState.currentPlayerTurn);

        let actions = getAvailableActionsByDirection(gameState, Direction.N);
        expect(actions.length).toBe(2);
        expect(actions.find(action => action.action === Action.MoveVictimOrHazmat)).toBeFalsy();
    })
})