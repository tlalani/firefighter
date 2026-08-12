import { useSetupContext } from '@contexts/SetupContext'
import PlayerPicker from './PlayerPicker/PlayerPicker'
import SpotSelector from './SpotSelector/SpotSelector';

export default function SetupScreen() {

    const { setupState } = useSetupContext();

    return <>
        {setupState.gamePhase === "SETUP_PLAYERS" && <PlayerPicker></PlayerPicker>}
        {setupState.gamePhase === "INITIAL_SPOT" && <SpotSelector></SpotSelector>}
    </>
}