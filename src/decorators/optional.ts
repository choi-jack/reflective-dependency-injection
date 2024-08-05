import { Metadata, MetadataReflector } from 'class-metadata';

import { OPTIONAL } from '../metadata-keys.js';

export function Optional(): ParameterDecorator {
    return MetadataReflector.createDecorator((metadata: Metadata): void => {
        metadata.set(OPTIONAL, true);
    });
}
