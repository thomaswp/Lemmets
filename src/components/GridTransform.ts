import { Component } from "ecs-lib";
import { Vector2 } from "../Util/Vector2Int";

export type GridTransform = Vector2;

export const GridTransformComponent = Component.register<GridTransform>();