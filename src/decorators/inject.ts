import { Metadata } from 'class-metadata';

import { Identifier } from '../identifier.js';
import { MetadataKeys } from '../metadata-keys.js';

export function Inject(identifier: Identifier): ParameterDecorator {
    return Metadata.decorator((metadata: Metadata): void => {
        if (metadata.hasOwn(MetadataKeys.RDI_IDENTIFIER)) {
            throw new Error('Identifier has already been specified.');
        }

        metadata.set(MetadataKeys.RDI_IDENTIFIER, identifier);
    });
}
