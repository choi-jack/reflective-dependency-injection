import { Identifier } from '../identifier.js';

export interface ValueProvider {
    readonly identifier: Identifier;
    readonly useValue: unknown;
}
