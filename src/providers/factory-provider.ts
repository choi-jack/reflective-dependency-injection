import { Context } from '../context.js';
import { Identifier } from '../identifier.js';
import { Lifetime } from '../lifetime.js';

export type Factory<T = unknown> = (context: Context) => T | Promise<T>;

export interface FactoryProvider<T = unknown> {
    readonly identifier: Identifier<T>;
    readonly useFactory: Factory<T>;

    /**
     * @default Lifetime.SINGLETON
     */
    readonly lifetime?: Lifetime;
}
