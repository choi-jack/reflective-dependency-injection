import { Identifier } from '../identifier.js';

export interface ExistingProvider {
    readonly identifier: Identifier;
    readonly useExisting: Identifier;
}
