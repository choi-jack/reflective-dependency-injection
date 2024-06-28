import { Identifier } from '../identifier.js';

export interface ValueProvider<T = unknown> {
    readonly identifier: Identifier<T>;
    readonly useValue: T;
}
