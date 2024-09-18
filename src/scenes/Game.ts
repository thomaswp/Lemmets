import { Scene } from 'phaser';
import { GridManager } from '../singletons/GridManager';
import { CollisionManager } from '../singletons/CollisionsManager';
import { EntityRegistry } from '../singletons/EntityRegistry';
import { SceneManager } from '../engine/SceneManager';
import { Graphics } from '../singletons/Graphics';
import { CircleEntity } from '../entities/CircleEntity';
import { GridWalkingSystem } from '../systems/GridWalkingSystem';
import { PlayerControls } from '../systems/PlayerControls';
import { CircleRendererSystem } from '../components/CircleRenderer';
import GridEngine, { Direction } from 'grid-engine';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    sceneManager: SceneManager;

    private gridEngine!: GridEngine;

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
        sceneManager.world.addSystem(new PlayerControls(singletonManager));

        const player = new CircleEntity(this);

        sceneManager.addEntity(player);


        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000ff);


        // const playerSprite = this.add.graphics();
        // playerSprite.fillStyle(0x555555);
        // playerSprite.fillCircle(0, 0, 40);
        // const gridEngineConfig = {
        //     characters: [
        //         {
        //             id: "player",
        //             sprite: playerSprite,
        //         },
        //     ],
        // };

        // const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
        // cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
        // for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
        //     const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
        //     layer!.scale = 3;
        // }

        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.scale = 1.5;
        this.cameras.main.startFollow(playerSprite, true);
        this.cameras.main.setFollowOffset(
            -playerSprite.width,
            -playerSprite.height
        );

        const customTilemap = this.make.tilemap({
            width: 10,
            height: 10,
            tileWidth: 32,
            tileHeight: 32,
        });
        customTilemap.addTilesetImage("Cloud City", "tiles");
        const layer = customTilemap.createBlankLayer("custom", "Cloud City", 0, 0);
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                let collision = i % 2 === 0 && j % 2 === 0;
                const tile = layer?.putTileAt(i + j, i, j);
                // tile.setCollision(collision, collision, collision, collision);
                layer?.setScale(3);
                // layer!.getTileAt(i, j).index = (i + j);
            }
        }

        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 6,
                    startPosition: { x: 3, y: 3 },
                },
            ],
        };

        this.gridEngine.create(customTilemap, gridEngineConfig);

    }

    update(time: number, delta: number): void {
        this.sceneManager.update();

        const cursors = this.input.keyboard!.createCursorKeys();
        if (cursors.left.isDown) {
            this.gridEngine.move("player", Direction.LEFT);
        } else if (cursors.right.isDown) {
            this.gridEngine.move("player", Direction.RIGHT);
        } else if (cursors.up.isDown) {
            this.gridEngine.move("player", Direction.UP);
        } else if (cursors.down.isDown) {
            this.gridEngine.move("player", Direction.DOWN);
        }
    }

    preload() {
        this.load.image("tiles", "assets/cloud_tileset.png");
        this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");

        this.load.spritesheet("player", "assets/characters.png", {
          frameWidth: 52,
          frameHeight: 72,
        });
      }
}
