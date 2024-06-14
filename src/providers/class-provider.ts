import { Class } from '../class.js';
import { Identifier } from '../identifier.js';
import { Lifetime } from '../lifetime.js';

export interface ClassProvider {
    readonly identifier: Identifier;
    readonly useClass: Class;

    /**
     * @default Lifetime.SINGLETON
     */
    readonly lifetime?: Lifetime;
}
