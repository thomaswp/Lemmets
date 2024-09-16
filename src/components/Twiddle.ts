import { Component } from "../engine/Component";
import { Transform } from "./Transform";

export class Twiddle extends Component {

    private container: Phaser.GameObjects.Container;

    init() {
        this.container = this.entity.getComponent(Transform).container;
    }

    update() {
        this.container.x += 1;
    }
}