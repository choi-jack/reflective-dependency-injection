import { ClassProvider } from './class-provider.js';
import { ExistingProvider } from './existing-provider.js';
import { FactoryProvider } from './factory-provider.js';
import { ValueProvider } from './value-provider.js';

export type Provider
    = ClassProvider
    | ExistingProvider
    | FactoryProvider
    | ValueProvider;

export function isClassProvider(provider: Provider): provider is ClassProvider {
    return 'useClass' in provider;
}

export function isExistingProvider(provider: Provider): provider is ExistingProvider {
    return 'useExisting' in provider;
}

export function isFactoryProvider(provider: Provider): provider is FactoryProvider {
    return 'useFactory' in provider;
}

export function isValueProvider(provider: Provider): provider is ValueProvider {
    return 'useValue' in provider;
}
