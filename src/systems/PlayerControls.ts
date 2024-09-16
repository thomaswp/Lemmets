import { Entity, System } from "ecs-lib";
import { GridWalkerComponent } from "../components/GridWalker";
import { GridTransformComponent } from "../components/GridTransform";
import { Vector2 } from "../Util/Vector2Int";

export class PlayerControls extends System {
    
    private keyboardDirection = new Vector2(0, 0);

    constructor() {
        super([
            GridWalkerComponent.type,
            GridTransformComponent.type,
        ]);

        window.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.keyboardDirection.y = -1;
                    break;
                case 'ArrowDown':
                    this.keyboardDirection.y = 1;
                    break;
                case 'ArrowLeft':
                    this.keyboardDirection.x = -1;
                    break;
                case 'ArrowRight':
                    this.keyboardDirection.x = 1;
                    break;
            }
        };
        window.onkeyup = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    this.keyboardDirection.y = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.keyboardDirection.x = 0;
                    break;
            }
        };
    }

    update(time: number, delta: number, entity: Entity) {
        const gridWalker = GridWalkerComponent.oneFrom(entity).data;
        const gridTransform = GridTransformComponent.oneFrom(entity).data;

        if (gridWalker.timeSinceLastMove < gridWalker.moveInterval) {
            return;
        }

        if (this.keyboardDirection.is(0, 0)) {
            return;
        }

        gridTransform.add(this.keyboardDirection);
        gridWalker.timeSinceLastMove = 0;
    }
}