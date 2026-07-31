import { EdgeLayer } from './EdgeLayer/EdgeLayer';
import Tile from './Tile/Tile';
import './Board.css';
import { generateBoard, board1Easy } from '@firefighter/engine';
import EntityLayer from './EntityLayer/EntityLayer';
import HighlightLayer from './HighlightLayer/HighlightLayer';
import PlayerLayer from './PlayerLayer/PlayerLayer';

interface BoardProps {
    onTileClick?: (tileID: number) => void;
}

function Board({ onTileClick }: BoardProps) {
    const { width, height, tiles, edges } = board1Easy;
    return (
        <div>
            <div className='board'>
                {tiles.map(tile => (
                    <Tile
                        tile={tile}
                        onTileClick={(tileID) => console.log(tileID)}
                    >

                    </Tile>
                ))}
            </div>
            <HighlightLayer></HighlightLayer>
            <EdgeLayer edges={edges} tiles={tiles} />
            <EntityLayer></EntityLayer>
            <PlayerLayer></PlayerLayer>
        </div>
    )
}

export default Board;
