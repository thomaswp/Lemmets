import { Vector2 } from "../Util/Vector2Int";
import { createComponentWithDefaults } from "../engine/ComponentUtil";

// export type GridWalker = {
//     timeSinceLastMove: number;
//     moveInterval: number;
//     moveStart: Vector2;
//     canMoveDiagonally: boolean;
// }

const GridWalkerDefaults = {
    timeSinceLastMove: 0,
    moveInterval: 1000,
    moveStart: new Vector2(0, 0),
    canMoveDiagonally: false
}

export type GridWalker = typeof GridWalkerDefaults;

// export const GridWalkerComponent = Component.register<GridWalker>();
export const GridWalkerComponent = createComponentWithDefaults<GridWalker>(GridWalkerDefaults);