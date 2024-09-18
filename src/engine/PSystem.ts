import { ComponentClassType, Entity, System } from "ecs-lib";
import { SingletonManager } from "./SingletonManager";
import { Scene } from "phaser";
import { GridTransform, GridTransformComponent } from "../components/GridTransform";
import { GridWalkerComponent } from "../components/GridWalker";
import { Vector2 } from "../Util/Vector2Int";

type ComponentList = ComponentClassType<any>[];
// A type that extracts the first type parameter from a generic type
type ExtractFirstTypeParameter<T> = T extends ComponentClassType<infer U> ? U : never;

// A recursive type to map over a tuple (array) of types and extract their type parameters
type ExtractTypeParameters<T extends any[]> = {
  [K in keyof T]: ExtractFirstTypeParameter<T[K]>;
};

export class PSystem<T extends any[]> extends System {

    protected readonly scene: Scene;

    constructor(public readonly singletonManager: SingletonManager, 
        public readonly components: T, 
        frequency: number = 1
    ) {
        super(components.map(c => c.type), frequency);

        this.scene = singletonManager.getSingleton(Scene);
    }

    getData(entity: Entity) : ExtractTypeParameters<T> {
        const mapped = this.components.map(c => c.oneFrom(entity).data);
        return mapped as ExtractTypeParameters<T>
    }
}

type t = ExtractTypeParameters<[ComponentClassType<GridTransform>, ComponentClassType<number>]>;

type params = [typeof GridTransformComponent, typeof GridWalkerComponent];
function test() {
    const types = [GridTransformComponent, GridWalkerComponent] as const;
    const psys = new PSystem(null, types, 1);
    const [grid, walker] = psys.getData(new Entity());
    

}

const components = [GridTransformComponent, GridWalkerComponent] as const;

class TestSystem extends PSystem<typeof components> {
    constructor(singletonManager: SingletonManager) {
        super(singletonManager, components);
    }

    update(time: number, delta: number, entity: Entity) {
        const [grid, walker] = this.getData(entity);
        console.log(grid, walker);
    }
}


// Define a base type constraint
class MyType {
    name: string;
  }
  
  // Define types that extend MyType
  class TypeA extends MyType {
    constructor(public name: string, public value: number) {
      super();
    }
  }
  
  class TypeB extends MyType {
    constructor(public name: string, public flag: boolean) {
      super();
    }
  }
  
  // Generic class constrained by MyType
  class MyGenericClass<T extends MyType[]> {
    constructor(public args: [...T]) {}
  
    getArgs(): [...T] {
      return this.args;
    }
  }
  
  // Usage with const assertion
  const instance1 = new MyGenericClass([new TypeA("example", 42), new TypeB("another", true)] as const);
  
  // TypeScript infers instance1's type as MyGenericClass<[TypeA, TypeB]>
  console.log(instance1.getArgs());