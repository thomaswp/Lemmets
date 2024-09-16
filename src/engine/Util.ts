
export type ConstructorOf<T> = new (...args: any[]) => T;

export type ArrayOfConstructors<T extends Object[]> = {
    [P in keyof T]: ConstructorOf<T[P]>;
};

export type NamedComponent = {
    __name: string;
}

export type NamesOf<T extends NamedComponent[]> = {
    [P in keyof T]: T[P]['__name'];
}

type Dictify<T extends NamedComponent> = {
    [P in T['__name']]: Omit<T, '__name'>;
}

type DictifyAll<T extends NamedComponent[]> = {
    [P in keyof T]: Dictify<T[P]>;
}

type UnionToIntersection<U> = 
    (U extends any ? (x: U) => void : never) extends (x: infer R) => void ? R : never;

export type MultiDict<T extends NamedComponent[]> = UnionToIntersection<DictifyAll<T>[number]>;

export class TypeMap<T extends Object> {
    private readonly map: Map<string, T> = new Map<string, T>();

    add(value: T) {
        let type = value.constructor.name;
        if (this.map.has(type)) {
            throw new Error(`Type ${type} already exists in map`);
        }
        this.map.set(type, value);
    }

    has(type: ConstructorOf<T>): boolean {
        return this.map.has(type.name);
    }

    get(type: ConstructorOf<T>): T {
        let value = this.map.get(type.name);
        if (value === undefined) {
            throw new Error(`Type ${type.name} not found in map`);
        }
        return value;
    }

    getOrNull(type: ConstructorOf<T>): T | null {
        let value = this.map.get(type.name);
        return value === undefined ? null : value;
    }

    values(): IterableIterator<T> {
        return this.map.values();
    }

    forEach(action: (value: T) => void) {
        for (const v of this.map.values()) {
            action(v);
        }
    }
}