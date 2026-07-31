import EdgeLine from './EdgeLine/EdgeLine';
import './EdgeLayer.css';
import { type SetupEdge, type SetupTiles } from '@firefighter/engine';

interface EdgeLayerProps {
    edges: SetupEdge[],
    tiles: SetupTiles[]
}

export function EdgeLayer({ edges, tiles }: EdgeLayerProps) {
    const tileMap = new Map(
        tiles.map(tile => [tile.id, tile])
    );

    return (
        <svg
            className="edge-layer"
            viewBox="0 0 10 8"
            preserveAspectRatio="none"
        >
            {edges.map(edge => {
                const a = tileMap.get(edge.tileA)!;
                const b = tileMap.get(edge.tileB)!;

                return (
                    <EdgeLine
                        key={edge.id}
                        edge={edge}
                        tileA={a}
                        tileB={b}
                    />
                );
            })}
        </svg>
    );
}

export default EdgeLayer;
