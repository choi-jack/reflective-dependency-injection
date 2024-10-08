import { ClassProvider } from './class-provider.js';
import { ExistingProvider } from './existing-provider.js';
import { FactoryProvider } from './factory-provider.js';
import { ValueProvider } from './value-provider.js';

export type Provider<T = unknown>
    = ClassProvider<T extends object ? T : object>
    | ExistingProvider<T>
    | FactoryProvider<T>
    | ValueProvider<T>;

export function provide<T>(provider: Provider<T>): Provider<T> {
    return provider;
}

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
