import { GameState } from "../../gamestate/gamestate.js";

export function cycleToNextPlayer(state: GameState) {
    if (!state.currentPlayerTurn) {
        state.currentPlayerTurn = state.playerTurnOrder[0]!
    }
    else {
        state.currentPlayerTurn = state.playerTurnOrder.splice(0, 1)[0]!;
        state.playerTurnOrder.push(state.currentPlayerTurn);
    }
    const player = state.players![state.currentPlayerTurn]!;
    player.currentAP = Math.min(player.currentAP + player.turnStartAP, 8);
}