export const GameActions = {
    INIT_GAME: "INIT_GAME",
    EXECUTE_ACTION: "EXECUTE_ACTION",
    END_TURN: "END_TURN"
} as const;

export const GameSetupActions = {
    ADD_PLAYER: "ADD_PLAYER",
    SET_DIFFICULTY: "SET_DIFFICULTY",
    SET_PLAYER_POSITION: "SET_PLAYER_POSITION",
    REMOVE_PLAYER: "REMOVE_PLAYER",
    START_GAME: "START_GAME",
    SET_INITIAL_LOC: "SET_INITIAL_LOC",
    GO_BACK: "GO_BACK"
} as const;

export type SetupAction = { type: keyof typeof GameSetupActions, payload?: any }
export type GameAction = { type: keyof typeof GameActions, payload?: any }