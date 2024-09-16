import { Component } from "./Component";
import { v4 } from 'uuid'
import { TypeMap, ConstructorOf } from "./Util";
import { SceneManager } from "./SceneManager";

export class Entity {

    public readonly Guid: string;
    
    private readonly components: TypeMap<Component> = new TypeMap<Component>();

    constructor() {
        this.Guid = v4();
    }

    addComponent(component: Component) {
        this.components.add(component);
    }

    getComponent<T extends Component>(clazz : ConstructorOf<T>) : T {
        return this.components.get(clazz) as T;
    }

    init(sceneManager: SceneManager) {
        for (let c of this.components.values()) {
            c.register(this, sceneManager.singletonManager);
        }
        for (let c of this.components.values()) {
            c.init();
        }
    }

    update() {
        for (let c of this.components.values()) {
            c.update();
        }
    }
}