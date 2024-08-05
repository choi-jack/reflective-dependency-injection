import { Metadata, MetadataReflector } from 'class-metadata';

import { Identifier } from '../identifier.js';
import { IDENTIFIER } from '../metadata-keys.js';

export function Inject(identifier: Identifier): ParameterDecorator {
    return MetadataReflector.createDecorator((metadata: Metadata): void => {
        if (metadata.hasOwn(IDENTIFIER)) {
            throw new Error('Identifier has already been specified.');
        }

        metadata.set(IDENTIFIER, identifier);
    });
}
