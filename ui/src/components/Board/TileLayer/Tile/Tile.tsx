import classNames from 'classnames';
import './Tile.css'
import { type Tile } from '@firefighter/engine';
type TileProps = {
  tile: Tile;
}
function GameTile({ tile }: TileProps) {

  const tileClass = classNames(
    "tile",
    `room-${tile.room}`,
  )
  return (
    <>
      <div className={tileClass} key={tile.id}>{tile.x},{tile.y}</div>
    </>
  )
}

export default GameTile
