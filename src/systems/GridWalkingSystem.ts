import { Entity, System } from "ecs-lib";
import { GridWalkerComponent } from "../components/GridWalker";
import { GridTransformComponent } from "../components/GridTransform";
import { SingletonManager } from "../engine/SingletonManager";
import { TransformComponent } from "../components/Transform";
import { GridManager } from "../singletons/GridManager";
import { lerp } from "../Util/Lerp";

export class GridWalkingSystem extends System {

    private gridManager: GridManager;

    constructor(private singletoneManager: SingletonManager) {
        super([
            GridTransformComponent.type,
            GridWalkerComponent.type,
            TransformComponent.type,
        ])
        this.gridManager = singletoneManager.getSingleton(GridManager);
    }

    enter(entity: Entity): void {
        const gridTransform = GridTransformComponent.oneFrom(entity).data;
        const gridWalker = GridWalkerComponent.oneFrom(entity).data;
        gridWalker.moveStart = gridTransform.clone();
    }

    update(time: number, delta: number, entity: Entity): void {
        const gridTransform = GridTransformComponent.oneFrom(entity).data;
        const gridWalker = GridWalkerComponent.oneFrom(entity).data;
        const transform = TransformComponent.oneFrom(entity).data;

        gridWalker.timeSinceLastMove += delta;

        if (gridTransform.equals(gridWalker.moveStart)) {
            return;
        }

        if (gridWalker.timeSinceLastMove >= gridWalker.moveInterval) {
            gridWalker.moveStart.set(gridTransform);
        }

        const perc = Math.min(gridWalker.timeSinceLastMove / gridWalker.moveInterval, 1);
        transform.x = lerp(gridWalker.moveStart.x, gridTransform.x, perc) * this.gridManager.tileWidth;
        transform.y = lerp(gridWalker.moveStart.y, gridTransform.y, perc) * this.gridManager.tileWidth;
        
    }
}