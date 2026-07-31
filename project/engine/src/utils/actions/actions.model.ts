import { Direction } from "../../board/direction";

export enum Action {
    OpenDoor = "OpenDoor",
    CloseDoor = "CloseDoor",
    Move = "Move",
    MoveFire = "MoveFire",
    MoveVictimOrHazmat = "MoveVictimOrHazmat",
    ExtinguishSmoke = "ExtinguishSmoke",
    FireToSmoke = "FireToSmoke",
    ExtinguishFire = "ExtinguishFire",
    Chop = "Chop",
    Drive = "Drive",
    Ride = "Ride",
    CrewChange = "CrewChange",
    DeckGun = "DeckGun",
    DropCarrying = "DropCarrying",
    "PickupFromGround" = "PickupFromGround"
}

export const ActionCost: Record<Action, number> = {
    [Action.OpenDoor]: 1,
    [Action.CloseDoor]: 1,
    [Action.Move]: 1,
    [Action.MoveFire]: 2,
    [Action.MoveVictimOrHazmat]: 2,
    [Action.ExtinguishSmoke]: 1,
    [Action.FireToSmoke]: 1,
    [Action.ExtinguishFire]: 2,
    [Action.Chop]: 2,
    [Action.Drive]: 2,
    [Action.Ride]: 0,
    [Action.CrewChange]: 2,
    [Action.DeckGun]: 2,
    [Action.DropCarrying]: 0,
    [Action.PickupFromGround]: 0
};

export interface AvailableAction {
    action: Action,
    direction?: Direction
}
