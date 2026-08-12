import './TileLayer.css';
import { type Tile, type TileID } from "@firefighter/engine";
import GameTile from "./Tile/Tile";
type TileLayerProps = {
    tiles: Tile[],
    onTileClick: (id: TileID) => void
}

function TileLayer({ tiles, onTileClick }: TileLayerProps) {

    return <div className="tile-layer">
        {tiles.sort((a, b) => a.id - b.id).map(tile => <GameTile onTileClick={onTileClick} key={tile.id} tile={tile}></GameTile>)}
    </div>
}

export default TileLayer;