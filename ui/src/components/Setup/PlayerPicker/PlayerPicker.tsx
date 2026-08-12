import './PlayerPicker.css'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { IconButton, InputAdornment, FormControl, FormHelperText, OutlinedInput } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useSetupContext } from '../../../context/SetupContext'
//import { generateGameState, board1Easy } from '@firefighter/engine';

function PlayerPicker() {
    const MAX_PLAYERS = 4
    const [currentPlayer, setCurrentPlayer] = useState("");

    const { setupState, dispatchSetup } = useSetupContext()

    const trimmedPlayer = currentPlayer.trim();
    const duplicateName = trimmedPlayer !== "" && setupState.players.map(p => p.name).includes(trimmedPlayer);
    const addDisabled = trimmedPlayer === "" || duplicateName || setupState.players.length >= MAX_PLAYERS;
    const helperText = trimmedPlayer === ""
        ? 'Type a player name to add'
        : duplicateName
            ? 'That name is already added'
            : `Players: ${setupState.players.length}/${MAX_PLAYERS}`;

    function addPlayer() {
        if (addDisabled) return;
        dispatchSetup({ type: 'ADD_PLAYER', payload: { playerName: trimmedPlayer } })
        setCurrentPlayer("");
    }

    function removePlayer(name: string) {
        dispatchSetup({ type: 'REMOVE_PLAYER', payload: { playerName: name } })
    }

    return (
        <section className="center-grid">
            <FormControl error={duplicateName}>
                <OutlinedInput
                    placeholder="Player Name"
                    disabled={setupState.players.length >= MAX_PLAYERS}
                    value={currentPlayer}
                    onChange={(e) => setCurrentPlayer(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={addPlayer} disabled={addDisabled} edge="end">
                                <Add />
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>

            {setupState.players.map((player, i) => (
                <FormControl key={i}>
                    <OutlinedInput
                        value={player.name}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton color="error" onClick={() => removePlayer(player.name)} edge="end" size="small">
                                    <Remove />
                                </IconButton>
                            </InputAdornment>
                        }
                        readOnly
                    />
                </FormControl>
            ))}

            {setupState.players.length >= MAX_PLAYERS && (
                <div style={{ color: 'gray', marginTop: 8, textAlign: 'center' }}>
                    Maximum of {MAX_PLAYERS} players reached
                </div>
            )}

            <Button
                variant="contained"
                onClick={() => dispatchSetup({ type: 'SET_INITIAL_LOC' })}
                disabled={setupState.players.length === 0}
            >
                Start Game
            </Button>
        </section>
    )
}

export default PlayerPicker;