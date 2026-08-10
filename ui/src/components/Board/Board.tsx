import EdgeLayer from '../EdgeLayer/EdgeLayer';
import EntityLayer from '../EntityLayer/EntityLayer';
import HighlightLayer from '../HighlightLayer/HighlightLayer';
import TileLayer from '../TileLayer/TileLayer';
import './Board.css'
import { generateBoard, board1Easy } from '@firefighter/engine';
const { width, height, tiles, edges } = board1Easy;

const board = generateBoard(width, height, tiles, edges);

function Board() {
  return (
    <>
      <div className="board">
        <TileLayer tiles={board.tiles}></TileLayer>
        <EdgeLayer></EdgeLayer>
        <HighlightLayer></HighlightLayer>
        <EntityLayer></EntityLayer>
      </div>
    </>
  )
}

export default Board
