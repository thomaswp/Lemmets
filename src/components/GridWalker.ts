import { Component } from "ecs-lib";
import { Vector2 } from "../Util/Vector2Int";

export type GridWalker = {
    timeSinceLastMove: number;
    moveInterval: number;
    moveStart: Vector2;
}

export const GridWalkerComponent = Component.register<GridWalker>();