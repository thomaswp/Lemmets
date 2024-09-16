import { Scene } from "phaser";

export class Graphics {
    private _scene: Scene;
    public get scene() {
        return this._scene;
    }

    setScene(scene: Scene) {
        this._scene = scene;
    }
}