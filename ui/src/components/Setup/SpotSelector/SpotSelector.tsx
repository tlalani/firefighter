import type { TileID } from "@firefighter/engine";
import { useState } from "react";
import { useSetupContext } from "@contexts/SetupContext";
import GameBoard from "../../Board/Board";

export default function SpotSelector() {

    const { setupState, dispatchSetup } = useSetupContext();
    const [idx, setIdx] = useState<number>(0);
    const player = setupState.players[idx]
    const darkenedTiles = new Set(setupState.board?.tiles?.map(tile => tile.id)?.filter(tile => !setupState.startupTiles?.includes(tile)));
    return <>
        <p>{player.name} - Please select your starting tile</p>
        <GameBoard onTileClick={(tileID: TileID) => {
            dispatchSetup({ type: 'SET_PLAYER_POSITION', payload: { tileID, playerID: player.id } })
            if (idx >= setupState.players.length - 1) dispatchSetup({ type: "START_GAME" });
            else setIdx(idx + 1);
        }} board={setupState.board!} highlighted={new Set(setupState.startupTiles!)} darkened={darkenedTiles} />
    </>
}