import { useState } from 'react'
import { type SetupPlayer } from '@firefighter/engine'
import Board from '../Board/Board';
//import { generateGameState, board1Easy } from '@firefighter/engine';

function App() {
  const [playerNames, setPlayerNames] = useState<SetupPlayer[] | null>(null);

  function setupPlayers(players: string[]) {
    setPlayerNames(players.map((name, index) => ({ id: index, tileID: null, name })));
  }

  return <Board></Board>
}

export default App
