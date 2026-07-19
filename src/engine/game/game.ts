import { Board } from "../board/board";
import * as map from '../../map/board1.json'
import { GameState } from "../gamestate/gamestate";
import { edgeID, playerID, roomID, tileID, TileID } from "../board/ids";
import { DoorEdge, Edge, EdgeType, WallEdge } from "../board/edge";
import { getAvailableActionByDirection, getExtinguishActionsOnTile, getPickupAndDropActionOnTile } from "../utils/queries";
import { DIRECTIONS } from "../board/direction";
import { AvailableAction } from "../utils/actions/actions.model";
const board: Board = {
    width: map.width,
    height: map.height,
    tiles: map.tiles.map(tile => ({ x: tile.x, y: tile.y, id: tileID(tile.id), room: roomID(tile.room), edges: {}, entity: null })),
    edges: map.edges.map(e => {
        const obj: Edge = { id: edgeID(e.id), tileA: e.tileA as TileID, tileB: e.tileB as TileID, type: e.type as EdgeType };
        if (e.type === EdgeType.WALL) {
            (obj as WallEdge)['counters'] = 0;
            return obj as WallEdge
        } else {
            (obj as DoorEdge)['open'] = false;
            return obj as DoorEdge
        }
    })
}

const state: GameState = {
    board,
    players: {
        [playerID(1)]: { id: playerID(1), tileID: tileID(40), carryingEntityID: null, turnStartAP: 5, currentAP: 5 }
    },
    entities: {},
    currentPlayerTurn: playerID(1)
}


const player = Object.values(state.players)[0]!;

let possibleActions: AvailableAction[] = [];

for (let dir of DIRECTIONS) {
    possibleActions.push(...getAvailableActionByDirection(state, player, dir))
}
possibleActions.push(...getPickupAndDropActionOnTile(state, player));
possibleActions.push(...getExtinguishActionsOnTile(state, player));

console.log(possibleActions);