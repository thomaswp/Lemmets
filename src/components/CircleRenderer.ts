import { Component } from "../engine/Component";
import { ArrayOfConstructors, MultiDict, NamedComponent } from "../engine/Util";
import { Graphics } from "../singletons/Graphics";


export type CircleRenderer = {
    __name: "circleRenderer";
    radius: number;
    color: number;
}

export type Transform = {
    __name: "transform";
    x: number;
    y: number;
}

export const TestComponent = {
    __name: "test",
    x: 0,
    y: 0,
}

type Player = MultiDict<[CircleRenderer, Transform]>;


function test() {
    let test: Player = {
        circleRenderer: {
            radius: 10,
            color: 0xff0000
        },
        transform: {
            x: 0,
            y: 0
        }
    };
    test.circleRenderer.color;

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