import { MetadataKey } from 'class-metadata';

import { Dependency } from './dependency.js';
import { Identifier } from './identifier.js';

export const DEPENDENCIES: MetadataKey<ReadonlyArray<Dependency>> = new MetadataKey('dependencies');
export const IDENTIFIER: MetadataKey<Identifier> = new MetadataKey('identifier');
export const OPTIONAL: MetadataKey<true> = new MetadataKey('OPTIONAL');
