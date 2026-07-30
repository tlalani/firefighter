import { Board } from "../board/board";
import * as map from '../../map/board1.json'
import { GameState } from "../gamestate/gamestate";
import { edgeID, playerID, roomID, tileID, TileID } from "../board/ids";
import { BoardEdge, DoorEdge, Edge, EdgeType, WallEdge } from "../board/edge";
import { getAvailableActionByDirection, getExtinguishActionsOnTile, getPickupAndDropActionOnTile } from "../utils/queries";
import { DIRECTIONS } from "../board/direction";
import { AvailableAction } from "../utils/actions/actions.model";
