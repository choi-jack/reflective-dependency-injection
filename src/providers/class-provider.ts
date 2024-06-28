import { Class } from '../class.js';
import { Identifier } from '../identifier.js';
import { Lifetime } from '../lifetime.js';

export interface ClassProvider<T = unknown> {
    readonly identifier: Identifier<T>;
    readonly useClass: Class<T>;

    /**
     * @default Lifetime.SINGLETON
     */
    readonly lifetime?: Lifetime;
}
