import GameTile from '../Tile/Tile';
import './Board.css'
import { generateBoard, board1Easy } from '@firefighter/engine';
const { width, height, tiles, edges } = board1Easy;

const board = generateBoard(width, height, tiles, edges);

function Board() {
  return (
    <>
      <div className="board">
        {board.tiles.sort((a, b) => a.id - b.id).map(tile => <GameTile key={tile.id} tile={tile}></GameTile>)}
      </div>
    </>
  )
}

export default Board
