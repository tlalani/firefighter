import './EdgeLine.css';
import { EdgeType } from '@firefighter/engine';
import type { DoorEdge, SetupEdge, SetupTiles, Tile, WallEdge } from '@firefighter/engine';

interface EdgeLineProps {
    tileA: SetupTiles | Tile,
    tileB: SetupTiles | Tile,
    edge: SetupEdge | DoorEdge | WallEdge
}

export function EdgeLayer({ tileA, tileB, edge }: EdgeLineProps) {

    const isHorizontal = tileA.x === tileB.x;
    const openDoor = edge.type === EdgeType.DOOR && edge.open;

    if (isHorizontal) {
        const x = tileA.x;
        const y = Math.max(tileA.y, tileB.y);
        return (
            <>
                <line
                    x1={openDoor ? x + 0.5 : x - 0.025}
                    y1={openDoor ? y + 0.5 : y}
                    x2={openDoor ? x + 0.9825 : x + 1.025}
                    y2={y}
                    stroke={edge.type === EdgeType.WALL ? "white" : "blue"}
                    strokeWidth="0.05"

                />
            </>
        );
    } else {
        const x = Math.max(tileA.x, tileB.x);
        const y = tileA.y;

        return (
            <>
                <line
                    x1={openDoor ? x + 0.3 : x}
                    y1={openDoor ? y + 0.3 : y}
                    x2={x}
                    y2={y + 1}
                    stroke={edge.type === EdgeType.WALL ? "white" : "blue"}
                    strokeWidth="0.05"
                />
            </>
        )
    }
}

export default EdgeLayer;
