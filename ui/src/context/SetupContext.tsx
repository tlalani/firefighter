import { Difficulty, type Board, type SetupPlayer, type TileID } from "@firefighter/engine";
import { createContext, useContext, type Dispatch } from "react";
import type { SetupAction } from "./reducer/Actions";

export type SetupState = { difficulty: Difficulty, board?: Board, players: SetupPlayer[], startupTiles?: TileID[], gamePhase: "SETUP_PLAYERS" | "INITIAL_SPOT" | "PLAYING" };

const SetupContext = createContext<{ setupState: SetupState; dispatchSetup: Dispatch<SetupAction> }>({
    setupState: { difficulty: Difficulty.EASY, players: [], gamePhase: "SETUP_PLAYERS" }, dispatchSetup: () => undefined
});

export function useSetupContext() {
    const context = useContext(SetupContext);
    if (!context) throw new Error("useSetupContext must be used within a SetupContext");

    return context;
}

export default SetupContext;