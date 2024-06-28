import { Class } from '../class.js';
import { Method, MethodReflector } from './method-reflector.js';

export class StaticMethodReflector<T = unknown> extends MethodReflector<T> {
    public constructor(
        target: Class,
        propertyKey: PropertyKey,
    ) {
        super(
            target,
            propertyKey,
            Reflect.get(target, propertyKey) as Method<T>,
            target,
        );
    }
}
