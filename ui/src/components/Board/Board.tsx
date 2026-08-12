import EdgeLayer from './EdgeLayer/EdgeLayer';
import EntityLayer from './EntityLayer/EntityLayer';
import HighlightLayer from './HighlightLayer/HighlightLayer';
import TileLayer from './TileLayer/TileLayer';
import './Board.css'
import type { Board, TileID } from '@firefighter/engine';

type BoardProps = {
  board: Board,
  highlighted: Set<TileID>,
  darkened: Set<TileID>,
  onTileClick: (id: TileID) => void
};

function GameBoard({ board, highlighted, darkened, onTileClick }: BoardProps) {
  return (
    <>
      <div className="board">
        <TileLayer onTileClick={onTileClick} tiles={board.tiles}></TileLayer>
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

export default GameBoard
