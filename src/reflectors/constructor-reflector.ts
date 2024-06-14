import { Class } from '../class.js';
import { Reflector } from './reflector.js';

export class ConstructorReflector<T = unknown> extends Reflector {
    public constructor(
        public readonly target: Class<T>,
    ) {
        super(target, null);
    }

    public construct(args: ReadonlyArray<unknown>): T {
        return Reflect.construct(this.target, args);
    }
}
