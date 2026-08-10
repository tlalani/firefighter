import BackdropEdge from './Edge/BackdropEdge'
import DoorEdge from './Edge/DoorEdge'
import WallEdge from './Edge/WallEdge'
import './EdgeLayer'
import { EdgeType, type Edge, type Tile, type WallEdge as Wall, type DoorEdge as Door } from "@firefighter/engine"


type EdgeLayerProps = {
    edges: Edge[],
    tiles: Tile[],
}
export default function EdgeLayer({ edges, tiles }: EdgeLayerProps) {
    return <svg className="edge-layer" viewBox="0 0 10 8" preserveAspectRatio="none">
        {edges.map(e => <BackdropEdge key={e.id} edge={e} tiles={tiles}></BackdropEdge>)}
        {edges.map(e => e.type === EdgeType.WALL ? <WallEdge key={e.id} edge={e as Wall} tiles={tiles}></WallEdge> : <DoorEdge key={e.id} edge={e as Door} tiles={tiles}></DoorEdge>)}
    </svg>
}