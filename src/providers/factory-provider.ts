import { Context } from '../context.js';
import { Identifier } from '../identifier.js';
import { Lifetime } from '../lifetime.js';

export type Factory = (context: Context) => unknown;

export interface FactoryProvider {
    readonly identifier: Identifier;
    readonly useFactory: Factory;

    /**
     * @default Lifetime.SINGLETON
     */
    readonly lifetime?: Lifetime;
}
