import { EntityID, PlayerID } from "../../board/ids";
import { GameState } from "../../gamestate/gamestate";
import { Player } from "../../player/player";

export function whichPlayerCarryingEntity(state: GameState, entityID: EntityID): Player | undefined {
    return Object.values(state.players).find(p => p.carryingEntityID === entityID);
}