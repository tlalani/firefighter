import './TileLayer.css';
import { type Tile } from "@firefighter/engine";
import GameTile from "./Tile/Tile";
type TileLayerProps = {
    tiles: Tile[]
}

function TileLayer({ tiles }: TileLayerProps) {

    return <div className="tile-layer">
        {tiles.sort((a, b) => a.id - b.id).map(tile => <GameTile key={tile.id} tile={tile}></GameTile>)}
    </div>
}

export default TileLayer;