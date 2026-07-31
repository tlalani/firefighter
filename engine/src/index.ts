export type { GameState } from "./gamestate/gamestate.js";
export * from "./utils/actions.js";
export * from "./utils/queries.js";
export * from "./utils/game-setup.js";

export * from "./board/ids.js";

export type { Player } from './player/player.js';

export type { Entity } from './entities/entity.js';
export type { POIEntity } from './entities/poi.js';
export type { FireEntity } from './entities/fire.js';
export type { SmokeEntity } from './entities/smoke.js';
export type { ChemicalEntity } from './entities/chemical.js';

export type { Tile } from './board/tile.js';
export type { Edge, DoorEdge, WallEdge } from './board/edge.js';
export { EdgeType } from './board/edge.js';
export type { Direction, DIRECTIONS } from './board/direction.js';

export { default as board1Easy } from "../maps/board1-easy.json";