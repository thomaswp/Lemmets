import { CircleRenderer, Transform } from "../components/CircleRenderer";
import { Singleton } from "./Singleton";
import { ArrayOfConstructors, ConstructorOf, MultiDict, NamedComponent, NamesOf } from "./Util";

export abstract class System<Components extends NamedComponent[], Singletons extends Singleton[]> {

    private components: MultiDict<Components>;
    private singletonTypes: ArrayOfConstructors<Singletons>

    abstract provideComponentNames(): NamesOf<Components>;    

    update(components: MultiDict<Components>, singletons: Singletons): void {
        // Noop
    }

}

type Comps = [CircleRenderer, Transform];

class TestSystem extends System<Comps, []> {

    
    update(components: MultiDict<Comps>): void {
        components.circleRenderer.color;
    }

    provideComponentNames(): ["circleRenderer", "transform"] {
        return ["circleRenderer", "transform"];
    }
}