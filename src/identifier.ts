import { Class } from './class.js';
import { InjectionToken } from './injection-token.js';

export type Identifier<T = unknown>
    = Class<T>
    | InjectionToken<T>;

export function isIdentifier(value: unknown): value is Identifier {
    return typeof value === 'function' || value instanceof InjectionToken;
}

export function stringifyIdentifier(identifier: Identifier): string {
    if (typeof identifier === 'function') {
        return `Class(${identifier.name})`;
    }

    return identifier.toString();
}
