import { Component, ComponentClassType, Entity, System } from "ecs-lib";
import { SingletonManager } from "./SingletonManager";
import { Scene } from "phaser";
import { Graphics } from "../singletons/Graphics";

type ComponentList = readonly ComponentClassType<any>[];
// A type that extracts the first type parameter from a generic type
type ExtractFirstTypeParameter<T> = T extends ComponentClassType<infer U> ? U : never;

// A recursive type to map over a tuple (array) of types and extract their type parameters
type ExtractTypeParameters<T extends readonly any[]> = {
  [K in keyof T]: ExtractFirstTypeParameter<T[K]>;
};

type ComponentsOf<T extends ComponentList> = {
    [K in keyof T]: Component<ExtractFirstTypeParameter<T[K]>>;
};

export abstract class PSystem<T extends ComponentList> extends System {

    protected readonly scene: Scene;

    constructor(public readonly singletonManager: SingletonManager,
        public readonly components: T,
        frequency: number = 0
    ) {
        super(components.map(c => c.type), frequency);

        this.scene = singletonManager.getSingleton(Graphics).scene;
    }

    getComponents(entity: Entity): ComponentsOf<T> {
        return this.components.map(c => c.oneFrom(entity)) as ComponentsOf<T>;
    }

    getData(entity: Entity) : ExtractTypeParameters<T> {
        const mapped = this.components.map(c => c.oneFrom(entity).data);
        return mapped as ExtractTypeParameters<T>
    }
}

// const components = [GridTransformComponent, GridWalkerComponent] as const;

// class TestSystem extends PSystem<typeof components> {
//     constructor(singletonManager: SingletonManager) {
//         super(singletonManager, components);
//     }

//     update(time: number, delta: number, entity: Entity) {
//         const [grid, walker] = this.getData(entity);
//         console.log(grid, walker);
//     }
// }


// // Base class
// class MyType {
//   name: string;
// }

// class TypeA extends MyType {
//   constructor(public name: string, public value: number) {
//     super();
//   }
// }

// class TypeB extends MyType {
//   constructor(public name: string, public flag: boolean) {
//     super();
//   }
// }

// type Mutable<T> = { -readonly [P in keyof T]: T[P] };
// type Immutable<T> = { +readonly [P in keyof T]: T[P] };

// // Base generic class constrained by MyType[]
// class MyGenericClass<  T extends readonly MyType[]> {
//   constructor(public args: T) {}

//   getArgs(): T {
//     return this.args;
//   }
// }


// // Define a const array of TypeA and TypeB instances
// const myTypes = [new TypeA("example", 42), new TypeB("another", true)] as const;

// // Extend MyGenericClass, using `typeof myTypes` to infer types
// class MyExtendedClass extends MyGenericClass<typeof myTypes> {
//   constructor() {
//     // Use the array as a default value for the base class constructor
//     super(myTypes);
//   }
// }

// // Usage
// const extendedInstance = new MyExtendedClass();
// console.log(extendedInstance.getArgs());

// const x = extendedInstance.getArgs()[0]