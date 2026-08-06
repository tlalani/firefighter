import { EntityID } from "../../board/ids.js";
import { GameState } from "../../gamestate/gamestate.js";
import { Player } from "../../player/player.js";

export function whichPlayerCarryingEntity(state: GameState, entityID: EntityID): Player | undefined {
    if (!state.players) throw new Error('No Players in state');
    return Object.values(state.players).find(p => p.carryingEntityID === entityID);
}