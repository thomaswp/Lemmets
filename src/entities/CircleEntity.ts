import { Entity } from "ecs-lib";
import { TransformComponent } from "../components/Transform";
import { Scene } from "phaser";
import { CircleRendererComponent } from "../components/CircleRenderer";
import { GridTransformComponent } from "../components/GridTransform";
import { Vector2 } from "../Util/Vector2Int";
import { GridWalkerComponent } from "../components/GridWalker";

export class CircleEntity extends Entity {
    constructor(scene: Scene) {
        super();
        this.add(new TransformComponent(scene.add.container(0, 0)));
        this.add(new CircleRendererComponent({
            radius: 10,
            color: 0xff0000
        }));
        this.add(new GridTransformComponent(new Vector2(0, 0)));
        this.add(new GridWalkerComponent({
            moveInterval: 500,
            canMoveDiagonally: true,
        }));
    }
}