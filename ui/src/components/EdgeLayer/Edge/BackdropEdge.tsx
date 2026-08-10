import { EdgeType, type DoorEdge, type Edge, type Tile } from "@firefighter/engine"

type EdgeProps = {
    edge: Edge,
    tiles: Tile[]
}

export default function WallEdge({ edge, tiles }: EdgeProps) {
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

    if (edge.type !== EdgeType.DOOR || !(edge as DoorEdge).open) {
        return <>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth="0.06"
            />
        </>
    } else {
        if (sameX) {
            y2 -= 0.4;
            x2 -= 0.19;
        } else {
            x2 -= 0.4;
            y2 -= 0.19
        }
        return <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth="0.06"
        />
    }
}