import { Component } from "../engine/Component";
import { Graphics } from "../singletons/Graphics";

export class Transform extends Component {

    private _container: Phaser.GameObjects.Container;
    public get container() {
        return this._container;
    }

    public get x() {
        return this.container.x;
    }

    public set x(x: number) {
        this.container.x = x;
    }

    public get y() {
        return this.container.y;
    }

    public set y(y: number) {
        this.container.y = y;
    }

    constructor(private startX: number, private startY: number) {
        super();
    }

    init() {
        console.log("Transform init");
        const scene = this.getSingleton(Graphics).scene;
        this._container = scene.add.container(this.startX, this.startY);
    }
}