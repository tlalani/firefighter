import EdgeLayer from './EdgeLayer/EdgeLayer';
import EntityLayer from './EntityLayer/EntityLayer';
import HighlightLayer from './HighlightLayer/HighlightLayer';
import TileLayer from './TileLayer/TileLayer';
import './Board.css'
import type { Board, Entity, EntityID, Player, PlayerID, SetupPlayer, TileID } from '@firefighter/engine';
import PlayerLayer from './PlayerLayer/PlayerLayer';
import { useState } from 'react';
import PlayerPreviewLayer from './PlayerPreviewLayer/PlayerPreviewLayer';

type BoardProps = {
  board: Board,
  highlighted: Set<TileID>,
  darkened: Set<TileID>,
  entities?: Record<EntityID, Entity> | null,
  players?: Record<PlayerID, Player> | null,
  setupPlayers?: SetupPlayer[],
  onTileClick: (id: TileID) => void
}; 

function GameBoard({ board, highlighted, entities, players, darkened, setupPlayers = [], onTileClick }: BoardProps) {
  const [hoveredTileID, setHoveredTileID] = useState<TileID | null>(null);
  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const col = Math.floor(x * 10);
    const row = Math.floor(y * 8); 
    
    const tile = board.tiles.find(
      t => t.x === col && t.y === row
    );

    setHoveredTileID(
      tile && highlighted.has(tile.id) ? tile.id : null
    );
  }

  return (
    <>
      <div className="board" onMouseMove={onMouseMove} onMouseLeave={() => setHoveredTileID(null)}>
        <TileLayer highlighted={highlighted} onTileClick={onTileClick} tiles={board.tiles}></TileLayer>
        <EdgeLayer edges={board.edges} tiles={board.tiles}></EdgeLayer>
        <HighlightLayer
          tiles={board.tiles}
          highlighted={highlighted}
          darkened={darkened}
        ></HighlightLayer>
        { entities == null ? <PlayerPreviewLayer players={setupPlayers} tiles={board.tiles} hoveredTileID={hoveredTileID}></PlayerPreviewLayer> : null}
        { entities ? <EntityLayer entities={entities} tiles={board.tiles}></EntityLayer> : null}
        { players ? <PlayerLayer players={players} tiles={board.tiles}></PlayerLayer> : null}
      </div>
    </>
  )
}

export default GameBoard
