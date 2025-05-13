import { DesignMetadataKeys, Metadata, MetadataReflector } from 'class-metadata';

import { Dependency } from '../dependency.js';
import { Identifier, isIdentifier } from '../identifier.js';
import { DEPENDENCIES, IDENTIFIER, OPTIONAL } from '../metadata-keys.js';

function getIdentifier(metadata: Metadata, type: unknown): Identifier {
    if (metadata.hasOwn(IDENTIFIER)) {
        return metadata.getOwn(IDENTIFIER)!;
    }

    if (isIdentifier(type)) {
        return type;
    }

    throw new Error(`Invalid identifier.\nIdentifier: ${type}`);
}

function getDependencies(metadata: Metadata): ReadonlyArray<Dependency> {
    if (metadata.hasOwn(DesignMetadataKeys.PARAMETER_TYPES)) {
        const parameterTypes: ReadonlyArray<unknown> = metadata.getOwn(DesignMetadataKeys.PARAMETER_TYPES) as null | ReadonlyArray<unknown> ?? [];

        return parameterTypes.map((parameterType: unknown, parameterIndex: number): Dependency => {
            const parameterMetadata: Metadata = MetadataReflector.reflect(metadata.target, metadata.propertyKey, parameterIndex);

            return {
                identifier: getIdentifier(parameterMetadata, parameterType),
                optional: parameterMetadata.hasOwn(OPTIONAL),
            };
        });
    }

    const parentTarget: null | object = Reflect.getPrototypeOf(metadata.target);

    if (parentTarget === null) {
        return [];
    }

    const parentMetadata: Metadata = MetadataReflector.reflect(parentTarget, metadata.propertyKey);

    if (parentMetadata.hasOwn(DEPENDENCIES)) {
        return parentMetadata.getOwn(DEPENDENCIES)!;
    }

    return getDependencies(parentMetadata);
}

export function Injectable(): ClassDecorator & MethodDecorator {
    return MetadataReflector.createDecorator((metadata: Metadata): void => {
        if (metadata.hasOwn(DEPENDENCIES)) {
            return;
        }

        metadata.set(DEPENDENCIES, getDependencies(metadata));
    });
}
