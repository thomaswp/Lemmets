import { Entity } from "./Entity";
import { SingletonManager } from "./SingletonManager";

/**
 * Manages a whole game scene and all the objects (Entities, Singletons)
 * that need to be created and destroyed in it.
 */
export class SceneManager {
    private entities: Entity[] = [];
    public readonly singletonManager: SingletonManager = new SingletonManager();
    
    constructor() {
    }

    start() {
        this.entities.forEach(e => e.init(this));
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    removeEntity(entity: Entity) {
        let index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
    }

    update() {
        this.singletonManager.update();
        for (let e of this.entities) {
            e.update();
        }
    }

}