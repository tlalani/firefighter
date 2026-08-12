import { useEffect, useReducer } from 'react'
import GameContext from '../context/GameContext'
import './App.css'
import Board from './Board/Board'
import { gameSetupReducer } from '../context/reducer/SetupReducer'
import SetupContext from '../context/SetupContext'
import { board1Easy, Difficulty, generateGameState } from '@firefighter/engine'
import { gameReducer } from '../context/reducer/GameReducer'
import { GameActions } from '../context/reducer/Actions'
import SetupScreen from './Setup/SetupScreen'

function App() {

  const [stateOfGame, dispatchGame] = useReducer(gameReducer, null);
  const [setupState, dispatchSetup] = useReducer(gameSetupReducer, {
    difficulty: Difficulty.EASY,
    players: [],
    gamePhase: 'SETUP_PLAYERS'
  });

  useEffect(() => {
    if (setupState.gamePhase !== "PLAYING" || stateOfGame !== null) return;

    const map = board1Easy;
    const initialState = generateGameState({ ...map, players: setupState.players });

    dispatchGame({ type: GameActions.INIT_GAME, payload: initialState });
  }, [setupState.gamePhase, stateOfGame]);

  return (
    <div className='container'>
      <SetupContext.Provider value={{ setupState, dispatchSetup }}>
        {setupState.gamePhase !== "PLAYING" && <SetupScreen />}
      </SetupContext.Provider>
      <GameContext.Provider value={{ stateOfGame, dispatchGame }}>
        {setupState.gamePhase === "PLAYING" && <div>Game Starting Baby!!!!</div>}
      </GameContext.Provider>
    </div>
  )
};

export default App
