import { Difficulty, type SetupPlayer } from "@firefighter/engine";
import { createContext, useContext, type Dispatch } from "react";
import type { SetupAction } from "./reducer/Actions";

export type SetupState = { difficulty: Difficulty, players: SetupPlayer[], gamePhase: "SETUP" | "PLAYING" };

const SetupContext = createContext<{ setupState: SetupState; dispatchSetup: Dispatch<SetupAction> }>({
    setupState: { difficulty: Difficulty.EASY, players: [], gamePhase: "SETUP" }, dispatchSetup: () => undefined
});

export function useSetupContext() {
    const context = useContext(SetupContext);
    if (!context) throw new Error("useSetupContext must be used within a SetupContext");

    return useContext(SetupContext);
}

export default SetupContext;