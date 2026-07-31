import './Tile.css';
import { type SetupTiles } from '@firefighter/engine';

interface BoardProps {
    tile: SetupTiles,
    onTileClick?: (tileID: number) => void;
}

function Tile({ tile, onTileClick }: BoardProps) {
    return (
        <div
            key={tile.id}
            className={'tile room' + tile.room}
            style={{
                gridColumn: tile.x + 1,
                gridRow: tile.y + 1
            }}
            onClick={() => onTileClick?.(tile.id)}
        >
        </div>
    )
}

export default Tile;
