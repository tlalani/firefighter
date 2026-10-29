import type { Entity, EntityID, Tile } from "@firefighter/engine"
import { EntityType } from "@firefighter/engine";
import './EntityLayer.css';

type EntityLayerProps = {
    entities: Record<EntityID, Entity>,
    tiles: Tile[],
}

export default function EntityLayer({ entities, tiles }: EntityLayerProps) {
    return <div className="entity-layer">
        {
            Object.values(entities).map(entity => {
                const tile = tiles.find(t => t.entity === entity.id);
                if (!tile) return null;

                return (
                    <div 
                        key={entity.id} 
                        className={`entity entity-${entity.type.toLowerCase()}`}
                        style={{
                        gridColumn: tile.x + 1,
                        gridRow: tile.y + 1,
                        }}>
                            {entity.type === EntityType.POI ? "?" : entity.type.charAt(0)}
                        </div>
                )
            })
        }
    </div>
}