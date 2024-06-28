import { Identifier } from './identifier.js';

export interface Context {
    has(identifier: Identifier): boolean;

    get<T = unknown>(identifier: Identifier<T>, optional?: boolean): Promise<undefined | T>;
    get<T = unknown>(identifier: Identifier<T>, optional?: false): Promise<T>;
}
