import { Dependency } from '../dependency.js';
import { Identifier } from '../identifier.js';
import { Lifetime } from '../lifetime.js';

export type Factory = (...args: any) => unknown;

export interface FactoryProvider {
    readonly identifier: Identifier;
    readonly useFactory: Factory;
    readonly dependencies?: ReadonlyArray<Identifier | Dependency>;

    /**
     * @default Lifetime.SINGLETON
     */
    readonly lifetime?: Lifetime;
}
