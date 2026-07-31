import { Direction } from "../../board/direction";
import { Tile } from "../../board/tile";

export function getDirection(a: Tile, b: Tile): Direction {
    if (b.x === a.x + 1) return Direction.E;
    if (b.x === a.x - 1) return Direction.W;
    if (b.y === a.y + 1) return Direction.S;
    if (b.y === a.y - 1) return Direction.N;

    throw new Error("Tiles are not adjacent");
}

export function opposite(dir: Direction): Direction {
    switch (dir) {
        case Direction.N:
            return Direction.S;
        case Direction.S:
            return Direction.N;
        case Direction.E:
            return Direction.W;
        case Direction.W:
            return Direction.E;
    }
}

export function getXYFromDirection(x: number, y: number, dir: Direction) {
    switch (dir) {
        case Direction.N:
            return [x, y - 1];
        case Direction.S:
            return [x, y + 1];
        case Direction.E:
            return [x + 1, y];
        case Direction.W:
            return [x - 1, y];
    }
}