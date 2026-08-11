import type { GameState } from "@firefighter/engine";
import { type GameAction } from "./Actions";

export function gameReducer(state: GameState | null, action: GameAction) {
    switch (action.type) {
        case "INIT_GAME":
            if (!action.payload) throw new Error("A full GameState must be passed in");
            return action.payload! as GameState;
        default:
            return state;
    }
}