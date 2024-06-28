import { Reflector } from './reflector.js';

export type Method<T = unknown> = (...args: ReadonlyArray<any>) => T;

export abstract class MethodReflector<T = unknown> extends Reflector {
    public constructor(
        public readonly target: object,
        public readonly propertyKey: PropertyKey,
        public readonly method: Method<T>,
        private readonly context: unknown,
    ) {
        super(target, propertyKey);
    }

    public invoke(args: ReadonlyArray<unknown>): T {
        return Reflect.apply(this.method, this.context, args);
    }
}
