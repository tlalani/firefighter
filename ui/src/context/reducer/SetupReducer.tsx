import { board1Easy, Difficulty, generateBoard, playerID, type SetupPlayer, tileID } from "@firefighter/engine";
import type { SetupAction } from "./Actions";
import type { SetupState } from "../SetupContext";


export function gameSetupReducer(state: SetupState, action: SetupAction): SetupState {
    switch (action.type) {
        case "ADD_PLAYER":
            if (state.players.length >= 4) return state;
            const id = state.players.sort((a, b) => b.id - a.id)[0]?.id
            const player: SetupPlayer = { id: playerID((id ?? 0) + 1), name: action.payload?.playerName }
            return {
                ...state,
                players: [...state.players, player]
            };
        case "REMOVE_PLAYER":
            if (state.players.length <= 0) return state;
            return {
                ...state,
                players: state.players.filter(p => p.name !== action.payload?.playerName)
            }
        case "SET_DIFFICULTY":
            return {
                ...state,
                difficulty: action.payload?.difficulty ?? Difficulty.EASY
            }
        case "START_GAME":
            return {
                ...state,
                gamePhase: "PLAYING"
            }
        case "SET_INITIAL_LOC":
            const map = getMapBasedOnDifficulty(state.difficulty);
            return {
                ...state,
                board: generateBoard(map),
                startupTiles: map.startupTiles.map(id => tileID(id)),
                gamePhase: "INITIAL_SPOT"
            }
        case "SET_PLAYER_POSITION":
            const currentPlayerID = action.payload?.playerID;
            const selectedTileID = action.payload.tileID;
            state.players.find(p => p.id === currentPlayerID)!.tileID = selectedTileID;
            return {
                ...state,
            }
        default:
            return state;
    }
}

function getMapBasedOnDifficulty(difficulty: Difficulty) {
    switch (difficulty) {
        case Difficulty.EASY:
        default:
            return board1Easy;
    }
}