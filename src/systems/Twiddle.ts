import { Entity, System } from "ecs-lib";
import { TransformComponent } from "../components/Transform";

export class Twiddle extends System {

    constructor() {
        super([TransformComponent.type]);
    }

    update(time: number, delta: number, entity: Entity) {
        TransformComponent.oneFrom(entity).data.x += 1;
    }
}