import type { SetupPlayer, Tile, TileID } from "@firefighter/engine";
import './PlayerPreviewLayer.css';
interface PlayerPreviewLayerProps {
    tiles: Tile[],
    hoveredTileID: TileID | null,
    players: SetupPlayer[]
}
export default function PlayerPreviewLayer({ tiles, hoveredTileID, players = [] }: PlayerPreviewLayerProps) {
    return (
        <div className="player-preview-layer">
            {
                players.map(player => {
                    const tile = tiles.find(tile => tile.id === player.tileID);
                    if (!tile) return null;
                    return (
                        <div
                            className="player-preview-cell"
                            style={{
                                gridColumn: tile.x + 1,
                                gridRow: tile.y + 1,
                            }}
                        >
                            <div className="player-token placed">{player.name.slice(0, 3)}</div>
                        </div>
                    )
                })
            }
            {!players.some(
                p => p.tileID === hoveredTileID) && 
                        (() => {
                            const playerCurr = players.find(player => !player.tileID);
                            const tile = tiles.find(t => t.id === hoveredTileID);

                            if (!tile) return null;
                            if (!playerCurr) return null;
                            return (
                                <div
                                    className="player-preview-cell"
                                    style={{
                                        gridColumn: tile.x + 1,
                                        gridRow: tile.y + 1,
                                    }}
                                >
                                    <div className="player-token hover">{playerCurr.name.slice(0, 3)}</div>
                                </div>
                            )
                        })()
            }
        </div>
    );
}