import './PlayerPicker.css'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
//import { generateGameState, board1Easy } from '@firefighter/engine';

type PlayerPickerProps = { onStart: (players: string[]) => void };

function PlayerPicker({ onStart }: PlayerPickerProps) {
    const MAX_PLAYERS = 4
    const [players, setPlayers] = useState<string[]>([""]);

    function addPlayer() {
        setPlayers((names) => [...names, ""]);
    }

    function removePlayer() {
        setPlayers((names) => names.slice(0, -1));
    }

    function updatePlayerName(index: number, name: string) {
        setPlayers((names) => {
            names[index] = name;
            return [...names];
        });
    }

    return (
        <>
            <section className="center-grid">
                <div className="button-container">
                    <Button
                        variant="outlined"
                        onClick={addPlayer}
                        disabled={players.length >= MAX_PLAYERS}
                    >
                        Add Player
                    </Button>
                    <Button variant="outlined"
                        onClick={removePlayer}
                        disabled={players.length < 2}
                    >
                        Remove Player
                    </Button>
                </div>
                {players.map((name, i) => (
                    <TextField
                        error={!!players.filter((_, ind) => ind !== i).find(pname => pname === name) || name.trim() === ""}
                        label="Player Name"
                        key={i}
                        value={name}
                        onChange={(e) => updatePlayerName(i, e.target.value)}
                    />
                ))}
                {players.length >= MAX_PLAYERS && (
                    <div style={{ color: 'gray', marginTop: 8, textAlign: 'center' }}>Maximum of {MAX_PLAYERS} players reached</div>
                )}
                <Button variant="contained" onClick={() => onStart(players)}>Start Game</Button>
            </section>
        </>
    )
}

export default PlayerPicker;
