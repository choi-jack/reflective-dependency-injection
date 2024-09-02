import { MetadataReflector } from 'class-metadata';

import { Dependency } from './dependency.js';
import { DEPENDENCIES } from './metadata-keys.js';

export function getOwnDependencies(target: object, propertyKey?: null | string | symbol): null | ReadonlyArray<Dependency> {
    return MetadataReflector
        .reflect(target, propertyKey)
        .getOwn(DEPENDENCIES);
}
