
import { type Tile } from "@firefighter/engine";
import GameTile from "./Tile/Tile";
type TileLayerProps = {
    tiles: Tile[]
}
function TileLayer({ tiles }: TileLayerProps) {

    return <>
        {tiles.sort((a, b) => a.id - b.id).map(tile => <GameTile key={tile.id} tile={tile}></GameTile>)}
    </>
}

export default TileLayer;