import { Singleton } from "./Singleton";
import { ArrayOfConstructors, ConstructorOf, TypeMap } from "./Util";
import toposort from "toposort";

type SingletonConstructor = (new (provider: ISingletonProvider) => Singleton);

type ArrayOfDependentConstructors<T extends Singleton[]> = {
    [P in keyof T]: ConstructorOf<T[P]> & { Deps?: SingletonConstructor };
};

export interface ISingletonProvider {
    getSingleton<T extends Singleton>(clazz: ConstructorOf<T>): T;
    getSingletons<T extends Singleton[]>(...classes: ArrayOfConstructors<T>): T;
}

class SingletonRequestRecorder implements ISingletonProvider {

    private currentRequestor: string | null = null;
    private requestMap = new Map<string, string[]>();

    startRequests(name: string) {
        this.currentRequestor = name;
        this.requestMap.set(name, []);
    }

    getSingleton<T extends Singleton>(clazz: ConstructorOf<T>): T {
        if (this.currentRequestor === null) {
            throw new Error("No requestor started");
        }
        console.log(`Requesting ${clazz.name} from ${this.currentRequestor}`);
        this.requestMap.get(this.currentRequestor)?.push(clazz.name);
        // Deps should never use the return value
        return null as any as T;
    }

    getSingletons<T extends Singleton[]>(...classes: ArrayOfConstructors<T>): T {
        return classes.map(c => this.getSingleton(c)) as T;
    }

    getLoadOrder(): string[] {
        // Topological sort dependencies based on requestMap, such
        // that requested dependencies are always loaded first
        const edges: [string, string][] = [];
        const classes: string[] = [];
        this.requestMap.forEach((deps, requestor) => {
            classes.push(requestor);
            deps.forEach(dep => {
                edges.push([dep, requestor]);
            });
        });
        console.log(edges);
        try {
            const sorted = toposort(edges);
            // Add classes with no dependencies
            classes.forEach(c => {
                if (!sorted.includes(c)) {
                    sorted.push(c);
                }
            });
            console.log(sorted);
            return sorted;
        } catch (e) {
            console.error(e);
            throw new Error("Circular dependency detected");
        }
    }
}

export class SingletonManager implements ISingletonProvider {
    private readonly singletons: TypeMap<Singleton> = new TypeMap<Singleton>();

    registerSingletons(...classes: ArrayOfDependentConstructors<Singleton[]>) {
        const recorder = new SingletonRequestRecorder();
        classes.forEach(c => {
            recorder.startRequests(c.name);
            const DepsConstructor = c.Deps;
            if (DepsConstructor) {
                new DepsConstructor(recorder);
            }
        });

        const classMap = new Map<string, ConstructorOf<Singleton>>();
        classes.forEach(c => {
            classMap.set(c.name, c);
        });
        recorder.getLoadOrder().forEach(name => {
            const clazz = classMap.get(name);
            if (!clazz) {
                throw new Error(`Dependency ${name} not included!`);
            }
            console.log(`Creating ${name}`);
            const instance = new clazz(this);
            this.singletons.add(instance);
        });
    }

    getSingleton<T extends Singleton>(clazz : ConstructorOf<T>) : T {
        return this.singletons.get(clazz) as T;
    }

    getSingletons<T extends Singleton[]>(...classes: ArrayOfConstructors<T>): T {
        return classes.map(c => this.getSingleton(c)) as T;
    }

    update() {
        
    }
}