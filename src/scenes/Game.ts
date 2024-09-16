import { Scene } from 'phaser';
import { SingletonManager } from '../engine/SingletonManager';
import { GridManager } from '../singletons/GridManager';
import { CollisionManager } from '../singletons/CollisionsManager';
import { EntityRegistry } from '../singletons/EntityRegistry';
import { SceneManager } from '../engine/SceneManager';
import { Entity } from '../engine/Entity';
import { CircleRenderer } from '../components/CircleRenderer';
import { Graphics } from '../singletons/Graphics';
import { Transform } from '../components/Transform';
import { Twiddle } from '../components/Twiddle';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    sceneManager: SceneManager;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const sceneManager = new SceneManager();
        this.sceneManager = sceneManager;

        console.log("registering!");
        const singletonManager = sceneManager.singletonManager;
        singletonManager.registerSingletons(
            GridManager,
            EntityRegistry,
            CollisionManager,
            Graphics,
        );
        singletonManager.getSingleton(Graphics).setScene(this);

        const player = new Entity();
        player.addComponent(new Transform(100, 100));
        player.addComponent(new CircleRenderer(10, 0xff0000));
        player.addComponent(new Twiddle());

        sceneManager.addEntity(player);

        sceneManager.start();

        

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000ff);
    }

    update(time: number, delta: number): void {
        this.sceneManager.update();
    }
}
