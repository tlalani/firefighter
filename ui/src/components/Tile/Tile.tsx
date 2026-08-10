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
        {
            'highlighted': tile.room === 9,
            'darkened': tile.room !== 9
        }
    )
  return (
    <>
      <div className={tileClass} key={tile.id}>{tile.id}</div>
    </>
  )
}

export default GameTile
