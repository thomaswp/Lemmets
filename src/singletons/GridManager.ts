import { ISingletonProvider, SingletonManager } from "../engine/SingletonManager";
import { CollisionManager } from "./CollisionsManager";
import { EntityRegistry } from "./EntityRegistry";


class GridManagerDeps {
    readonly collisionManager: CollisionManager;
    readonly entityRegistry: EntityRegistry;

    constructor(singletonManager: ISingletonProvider) {
        [
            this.collisionManager, 
            this.entityRegistry
        ] = singletonManager.getSingletons(CollisionManager, EntityRegistry);
    }
}

export class GridManager extends GridManagerDeps {
    public static readonly Deps = GridManagerDeps;

    public tileWidth = 32;
    public tileHeight = 32;

    constructor(singletonManager: SingletonManager) {
        super(singletonManager);
    }
}