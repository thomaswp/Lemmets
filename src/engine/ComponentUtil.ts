import { Component, ComponentClassType } from "ecs-lib";

type ComponentClassTypeWithDefaults<T> =
    ComponentClassType<T> &
    { new(data: Partial<T>): Component<T> };

export function createComponentWithDefaults<T>(dataDefaults: T) : ComponentClassTypeWithDefaults<T> {

    const BaseType = Component.register<T>();

    class Extension extends BaseType {
        constructor(data: Partial<T>) {
            super({...dataDefaults, ...data});
        }
    }

    return Extension;
}