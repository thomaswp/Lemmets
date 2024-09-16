import { Scene } from 'phaser';
import { SingletonManager } from '../engine/SingletonManager';
import { GridManager } from '../singletons/GridManager';
import { CollisionManager } from '../singletons/CollisionsManager';
import { EntityRegistry } from '../singletons/EntityRegistry';
import { SceneManager } from '../engine/SceneManager';
import { CircleRendererComponent, CircleRendererSystem } from '../components/CircleRenderer';
import { Graphics } from '../singletons/Graphics';
import { TransformComponent } from '../components/Transform';
import { Twiddle } from '../systems/Twiddle';
import { Entity } from 'ecs-lib';
import { CircleEntity } from '../entities/CircleEntity';
import { GridWalkingSystem } from '../systems/GridWalkingSystem';
import { PlayerControls } from '../systems/PlayerControls';

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

        // this.world.addSystem(new Twiddle());
        sceneManager.world.addSystem(new CircleRendererSystem(singletonManager));
        sceneManager.world.addSystem(new GridWalkingSystem(singletonManager));
        sceneManager.world.addSystem(new PlayerControls());

        const player = new CircleEntity(this);

        sceneManager.addEntity(player);
        

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000ff);
    }

    update(time: number, delta: number): void {
        this.sceneManager.update();
    }
}
