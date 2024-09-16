import { Entity } from "./Entity";
import { Singleton } from "./Singleton";
import { ISingletonProvider } from "./SingletonManager";
import { ConstructorOf } from "./Util";

export abstract class Component {

    private singletonProvider : ISingletonProvider;

    private _entity: Entity;
    public get entity() {
        return this._entity;
    }

    register(entity: Entity, singletonProvider: ISingletonProvider) {
        this._entity = entity;
        this.singletonProvider = singletonProvider;
    }

    init() {
        // Noop
    }

    getSingleton<T extends Singleton>(clazz: ConstructorOf<T>): T {
        return this.singletonProvider.getSingleton(clazz);
    }

    update() {
        // Noop
    }
}