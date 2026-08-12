import classNames from 'classnames';
import './Tile.css'
import { type Tile, type TileID } from '@firefighter/engine';
type TileProps = {
  tile: Tile;
  onTileClick: (id: TileID) => void
}
function GameTile({ tile, onTileClick }: TileProps) {

  const tileClass = classNames(
    "tile",
    `room-${tile.room}`,
  )
  return (
    <>
      <div onClick={() => onTileClick(tile.id)} className={tileClass} key={tile.id}>{tile.x},{tile.y}</div>
    </>
  )
}

export default GameTile
