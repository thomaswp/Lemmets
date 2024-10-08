import ECS, { Entity } from "ecs-lib";
import { SingletonManager } from "./SingletonManager";

/**
 * Manages a whole game scene and all the objects (Entities, Singletons)
 * that need to be created and destroyed in it.
 */
export class SceneManager {
    public readonly world: ECS;
    public readonly singletonManager: SingletonManager = new SingletonManager();

    constructor() {
        this.world = new ECS();
    }

    addEntity(entity: Entity) {
        this.world.addEntity(entity);
    }

    removeEntity(entity: Entity) {
        this.world.removeEntity(entity);
    }

    update() {
        this.world.update();
    }

}