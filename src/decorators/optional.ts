import { Metadata } from 'class-metadata';

import { MetadataKeys } from '../metadata-keys.js';

export function Optional(): ParameterDecorator {
    return Metadata.decorator((metadata: Metadata): void => {
        metadata.set(MetadataKeys.RDI_OPTIONAL, true);
    });
}
