import type { GameState } from "@firefighter/engine";
import { createContext, useContext, type Dispatch } from "react";
import type { GameAction } from "./reducer/Actions";

const GameContext = createContext<{ stateOfGame: GameState | null; dispatchGame: Dispatch<GameAction> }>({
    stateOfGame: null, dispatchGame: () => undefined
});

export function useGameContext() {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGameContext must be used within a GameContext");

    return useContext(GameContext);
}

export default GameContext;