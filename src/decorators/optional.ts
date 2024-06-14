import { Metadata } from 'class-metadata';

import { MetadataKeys } from '../metadata-keys.js';

export function Optional(): ParameterDecorator {
    return Metadata.decorator((metadata: Metadata): void => {
        metadata.set(MetadataKeys.REFLECTIVE_DEPENDENCY_INJECTION_DEPENDENCY_OPTIONAL, true);
    });
}
