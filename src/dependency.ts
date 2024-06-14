import { Identifier } from './identifier.js';

export interface Dependency {
    readonly identifier: Identifier;
    readonly optional: boolean;
}
