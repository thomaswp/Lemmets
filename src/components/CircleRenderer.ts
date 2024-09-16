import { Component, Entity, System } from "ecs-lib";
import { SingletonManager } from "../engine/SingletonManager";
import { Graphics } from "../singletons/Graphics";
import { TransformComponent } from "./Transform";


export type CircleRenderer = {
    radius: number;
    color: number;
}

export const CircleRendererComponent = Component.register<CircleRenderer>();

export class CircleRendererSystem extends System {

    constructor(private singletonManager: SingletonManager) {
        super([
            TransformComponent.type,
            CircleRendererComponent.type
        ]);
    }

    enter(entity: Entity): void {
        const transform = TransformComponent.oneFrom(entity).data;
        const circleRenderer = CircleRendererComponent.oneFrom(entity).data;
        const circle = this.singletonManager.getSingleton(Graphics).scene.add.circle(0, 0, circleRenderer.radius, circleRenderer.color);
        transform.add(circle);
    }
}

// export class CircleRenderer extends Component {

//     constructor(public radius: number, public color: number) {
//         super();
//     }

//     init() {
//         console.log("Circle init");
//         const scene = this.getSingleton(Graphics).scene;
//         const transform = this.entity.getComponent(Transform);
//         transform.container.add(scene.add.circle(0, 0, this.radius, this.color));
//     }
    
// }