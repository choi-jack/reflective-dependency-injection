import { Metadata } from 'class-metadata';

import { Dependency } from '../dependency.js';
import { MetadataKeys } from '../metadata-keys.js';

function getTargetName(target: object): string {
    if (typeof target === 'function') {
        return target.name;
    }

    return `${target.constructor.name}.prototype`;
}

function stringifyTarget(target: object, propertyKey: null | PropertyKey): string {
    const targetName: string = getTargetName(target);

    if (propertyKey === null) {
        return targetName;
    }

    return `${targetName}[${propertyKey.toString()}]`;
}

export abstract class Reflector {
    public readonly metadata: Metadata;

    public constructor(
        target: object,
        propertyKey: null | PropertyKey,
    ) {
        this.metadata = Metadata.of(target, propertyKey);
    }

    public isInjectable(): boolean {
        return this.metadata.hasOwn(MetadataKeys.REFLECTIVE_DEPENDENCY_INJECTION_DEPENDENCIES);
    }

    public getDependencies(): ReadonlyArray<Dependency> {
        if (!this.isInjectable()) {
            throw new Error(`Target is not injectable.\nTarget: ${stringifyTarget(this.metadata.target, this.metadata.propertyKey)}`);
        }

        return this.metadata.getOwn(MetadataKeys.REFLECTIVE_DEPENDENCY_INJECTION_DEPENDENCIES)!;
    }
}
