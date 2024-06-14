import { Reflector } from './reflector.js';

export abstract class MethodReflector<T = unknown> extends Reflector {
    public constructor(
        public readonly target: object,
        public readonly propertyKey: PropertyKey,
        public readonly method: (...args: any) => T,
        private readonly context: unknown,
    ) {
        super(target, propertyKey);
    }

    public invoke(args: ReadonlyArray<unknown>): T {
        return Reflect.apply(this.method, this.context, args);
    }
}
