import EdgeLayer from '../EdgeLayer/EdgeLayer';
import EntityLayer from '../EntityLayer/EntityLayer';
import HighlightLayer from '../HighlightLayer/HighlightLayer';
import TileLayer from '../TileLayer/TileLayer';
import './Board.css'
import { generateBoard, board1Easy, type TileID } from '@firefighter/engine';
const { width, height, tiles, edges } = board1Easy;

const board = generateBoard(width, height, tiles, edges);

function Board() {
  const highlighted = new Set(board.tiles.filter(tile => tile.room === 9).map(t => t.id));
  const darkened = new Set<TileID>(board.tiles.filter(tile => tile.room !== 9).map(t => t.id));
  return (
    <>
      <div className="board">
        <TileLayer tiles={board.tiles}></TileLayer>
        <EdgeLayer edges={board.edges} tiles={board.tiles}></EdgeLayer>
        <HighlightLayer
          tiles={board.tiles}
          highlighted={highlighted}
          darkened={darkened}
        ></HighlightLayer>
        <EntityLayer></EntityLayer>
      </div>
    </>
  )
}

export default Board
