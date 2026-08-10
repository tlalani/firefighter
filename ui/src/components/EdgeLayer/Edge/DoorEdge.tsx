import { type DoorEdge, type Tile } from "@firefighter/engine"

type EdgeProps = {
    edge: DoorEdge,
    tiles: Tile[]
}

export default function DoorEdge({ edge, tiles }: EdgeProps) {
    const tileA = tiles.find(tile => edge.tileA === tile.id)!;
    const tileB = tiles.find(tile => edge.tileB === tile.id)!;
    const sameX = tileA.x === tileB.x;
    let x1, y1, x2, y2;
    if (sameX) {//horizontal wall
        x1 = tileA.x - 0.02;
        y1 = tileB.y;
        x2 = tileA.x + 1.02;
        y2 = tileB.y;
    } else {//vertical wall
        x1 = tileB.x;
        y1 = tileB.y - 0.02;
        x2 = tileB.x;
        y2 = tileA.y + 1.02;
    }

    if (!edge.open) {
        let x3, y3, x4, y4;

        if (sameX) {
            x3 = x1 + 0.3;
            y3 = y1;
            x4 = x2 - 0.3;
            y4 = y2;
        } else {
            x3 = x1;
            y3 = y1 + 0.3;
            x4 = x2;
            y4 = y2 - 0.3
        }
        return <>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#D8C7A5"
                strokeWidth="0.04"
            />

            <line
                x1={x3}
                y1={y3}
                x2={x4}
                y2={y4}
                stroke="#D8C7A5"
                strokeWidth="0.08"
            />
        </>
    } else {
        if (sameX) {
            y2 -= 0.4;
            x2 -= 0.2;
        } else {
            x2 -= 0.4;
            y2 -= 0.2
        }
        return <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#D8C7A5"
            strokeWidth="0.04"
        />
    }
}