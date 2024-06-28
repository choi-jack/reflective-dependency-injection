import { Identifier } from '../identifier.js';

export interface ExistingProvider<T = unknown> {
    readonly identifier: Identifier<T>;
    readonly useExisting: Identifier<T>;
}
