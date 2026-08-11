export const GameActions = {
    INIT_GAME: "INIT_GAME"
} as const;

export const GameSetupActions = {
    ADD_PLAYER: "ADD_PLAYER",
    SET_DIFFICULTY: "SET_DIFFICULTY",
    SET_PLAYER_POSITION: "SET_PLAYER_POSITION",
    REMOVE_PLAYER: "REMOVE_PLAYER",
    START_GAME: "START_GAME"
} as const;

export type SetupAction = { type: keyof typeof GameSetupActions, payload?: any }
export type GameAction = { type: keyof typeof GameActions, payload?: any }