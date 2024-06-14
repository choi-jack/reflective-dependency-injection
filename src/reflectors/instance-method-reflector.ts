import { MethodReflector } from './method-reflector.js';

export class InstanceMethodReflector<T = unknown> extends MethodReflector<T> {
    public constructor(
        public readonly instance: object,
        propertyKey: PropertyKey,
    ) {
        const target: null | object = Reflect.getPrototypeOf(instance);

        if (target === null) {
            throw new Error('Invalid instance.');
        }

        super(
            target,
            propertyKey,
            Reflect.get(target, propertyKey),
            instance,
        );
    }
}
