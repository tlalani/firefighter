import type { Player, PlayerID, Tile } from '@firefighter/engine';
import './PlayerLayer.css';
interface PlayerLayerProps {
    players: Record<PlayerID, Player>;
    tiles: Tile[]
}

export default function PlayerLayer({ tiles, players }: PlayerLayerProps) {
    return <div className="player-layer">
        {
            Object.values(players).map(player => {
                const tile = tiles.find(tile => tile.id === player.tileID);
                if (!tile) return null;
                return (
                    <div
                        key={player.id}
                        className="player"
                        style={{
                            gridColumn: tile.x + 1,
                            gridRow: tile.y + 1,
                        }}>
                        {player.name.slice(0, 3)}
                    </div>
                )
            })
        }
    </div>
}