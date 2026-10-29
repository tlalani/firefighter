import type { TileID } from "@firefighter/engine";
import { useState } from "react";
import { useSetupContext } from "@contexts/SetupContext";
import GameBoard from "../../Board/Board";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

export default function SpotSelector() {

    const { setupState, dispatchSetup } = useSetupContext();
    const [idx, setIdx] = useState<number>(0);
    const [errorText, setErrorText] = useState<string>("");
    const player = setupState.players[idx]
    const darkenedTiles = new Set(setupState.board?.tiles?.map(tile => tile.id)?.filter(tile => !setupState.startupTiles?.includes(tile)));

    const onTileClick = (tileID: TileID) => {
        if (setupState.players.find(player => player.tileID === tileID) !== undefined) {
            setErrorText(" - Incorrect Position selected");
            return;
        }
        dispatchSetup({ type: 'SET_PLAYER_POSITION', payload: { tileID, playerID: player.id } })
        if (idx >= setupState.players.length - 1) dispatchSetup({ type: "START_GAME" });
        else setIdx(idx + 1);
    }

    const goBack = () => {
        dispatchSetup({ type: 'GO_BACK' })
    }

    return <div>
        <div style={{display: 'grid', gridTemplateColumns: 'min-content auto', padding: '0.5rem' }}>
            <Button variant="contained" onClick={goBack}>Back</Button>
            <p style={{textAlign: 'center'}}>{player.name} - Please select your starting tile {(<span style={{color: 'red'}}>{errorText}</span>)}</p>
        </div>
        <GameBoard onTileClick={onTileClick} setupPlayers={setupState.players} board={setupState.board!} highlighted={new Set(setupState.startupTiles!)} darkened={darkenedTiles} />
    </div>
}