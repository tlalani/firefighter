import './TileLayer.css';
import { type Tile, type TileID } from "@firefighter/engine";
import GameTile from "./Tile/Tile";
type TileLayerProps = {
    tiles: Tile[],
    highlighted: Set<TileID>
    onTileClick: (id: TileID) => void
}

function TileLayer({ tiles, onTileClick, highlighted }: TileLayerProps) {

    return <div className="tile-layer">
        {tiles.sort((a, b) => a.id - b.id).map(tile => <GameTile onTileClick={(id: TileID) => {
            if (!highlighted || highlighted.size < 1 || highlighted.has(id)) {
                return onTileClick(id);
            }
        }} key={tile.id} tile={tile}></GameTile>)}
    </div>
}

export default TileLayer;