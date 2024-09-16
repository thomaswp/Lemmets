
import { ISingletonProvider } from "../engine/SingletonManager";
import { EntityRegistry } from "./EntityRegistry";


class CollisionManagerDeps {
    readonly entityRegistry: EntityRegistry;

    constructor(provider : ISingletonProvider) {
        [this.entityRegistry] = provider.getSingletons(EntityRegistry);
    }
}

export class CollisionManager extends CollisionManagerDeps {
    static Deps = CollisionManagerDeps;

    update() {
        
    }
}