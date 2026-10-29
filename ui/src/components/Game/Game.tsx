import { useGameContext } from "@contexts/GameContext";
import { getAvailablePlayerActions, performAction, type AvailableAction, type TileID } from "@firefighter/engine";
import { useEffect, useMemo } from "react";
import GameBoard from "../Board/Board";

export default function Game() {
    const { stateOfGame, dispatchGame } = useGameContext();

    const currentPlayer = useMemo(() => {
        if (!stateOfGame || !stateOfGame.players || !stateOfGame.currentPlayerTurn) {
            return undefined;
        } else {
            return stateOfGame.players[stateOfGame.currentPlayerTurn];
        }
    }, [stateOfGame!.currentPlayerTurn])

    useEffect(() => {
        if (!stateOfGame || !currentPlayer) return;

        if (currentPlayer.currentAP <= 0) {
            dispatchGame({ type: "END_TURN" });
        }
    }, [stateOfGame, currentPlayer, dispatchGame]);

    const handleTileClick = (tileID: TileID) => {
        if (!stateOfGame) return;
        const actions = getAvailablePlayerActions(stateOfGame);
        if (!actions.length) return;
        
    }

    const handleOptionClick = (action: AvailableAction) => {
        if (!stateOfGame) return;
        performAction(stateOfGame, action.action, action.direction ?? null)
    }
    
    return <>
        {stateOfGame && <GameBoard board={stateOfGame.board} players={stateOfGame.players} entities={stateOfGame.entities} highlighted={new Set()} darkened={new Set()} onTileClick={handleTileClick}></GameBoard>}
    </>
}