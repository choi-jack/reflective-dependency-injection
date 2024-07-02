import { Metadata } from 'class-metadata';

import { Dependency } from '../dependency.js';
import { Identifier, isIdentifier } from '../identifier.js';
import { MetadataKeys } from '../metadata-keys.js';

function getDependencyIdentifier(metadata: Metadata): Identifier {
    if (metadata.hasOwn(MetadataKeys.RDI_IDENTIFIER)) {
        return metadata.getOwn(MetadataKeys.RDI_IDENTIFIER)!;
    }

    const type: unknown = metadata.getOwn(MetadataKeys.DESIGN_TYPE);

    if (isIdentifier(type)) {
        return type;
    }

    throw new Error(`Invalid identifier.\nIdentifier: ${type}`);
}

function createDependencies(methodMetadata: Metadata): ReadonlyArray<Dependency> {
    const parameterTypes: ReadonlyArray<unknown> = methodMetadata.getOwn(MetadataKeys.DESIGN_PARAMTYPES) ?? [];

    return parameterTypes.map((_parameterType: unknown, parameterIndex: number): Dependency => {
        const parameterMetadata: Metadata = Metadata.of(methodMetadata.target, methodMetadata.propertyKey, parameterIndex);

        return {
            identifier: getDependencyIdentifier(parameterMetadata),
            optional: parameterMetadata.getOwn(MetadataKeys.RDI_OPTIONAL) ?? false,
        };
    });
}

function getConstructorMetadata(metadata: Metadata): null | Metadata {
    if (metadata.hasOwn(MetadataKeys.DESIGN_PARAMTYPES)) {
        return metadata;
    }

    if (metadata.parent === null) {
        return null;
    }

    return getConstructorMetadata(metadata.parent);
}

function getDependencies(methodMetadata: Metadata): ReadonlyArray<Dependency> {
    if (methodMetadata.propertyKey !== null) {
        return createDependencies(methodMetadata);
    }

    const constructorMetadata: Metadata = getConstructorMetadata(methodMetadata) ?? methodMetadata;

    if (constructorMetadata === methodMetadata) {
        return createDependencies(methodMetadata);
    }

    if (!constructorMetadata.hasOwn(MetadataKeys.RDI_DEPENDENCIES)) {
        throw new Error(`Constructor is not injectable.\nConstructor: ${methodMetadata.target}`);
    }

    return constructorMetadata.getOwn(MetadataKeys.RDI_DEPENDENCIES)!;
}

export function Injectable(): ClassDecorator & MethodDecorator {
    return Metadata.decorator((methodMetadata: Metadata): void => {
        if (methodMetadata.hasOwn(MetadataKeys.RDI_DEPENDENCIES)) {
            return;
        }

        methodMetadata.set(MetadataKeys.RDI_DEPENDENCIES, getDependencies(methodMetadata));
    });
}
