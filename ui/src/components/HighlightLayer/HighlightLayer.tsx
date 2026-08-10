import './HighlightLayer.css'
import type { Tile, TileID } from "@firefighter/engine"
import classNames from "classnames"

type HighlightProps = {
    tiles: Tile[],
    highlighted?: Set<TileID>,
    darkened?: Set<TileID>
}

export default function HighlightLayer({ tiles, highlighted, darkened }: HighlightProps) {
    const getClass = (tile: Tile) => classNames(
        {
            'highlighted': highlighted?.has(tile.id),
            'darkened': darkened?.has(tile.id)
        });

    return <div className="highlight-layer">
        {tiles.map(tile => <div key={tile.id} className={getClass(tile)}></div>)}
    </div>
}