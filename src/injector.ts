import { Binding, SingletonBinding, TransientBinding } from './bindings.js';
import { Context } from './context.js';
import { Dependency } from './dependency.js';
import { Identifier, stringifyIdentifier } from './identifier.js';
import { Lifetime } from './lifetime.js';
import { Provider, isClassProvider, isExistingProvider, isFactoryProvider } from './providers.js';
import { DependencyResolver, ResolutionRequest } from './resolution.js';

export class Injector implements Context {
    private readonly bindings: ReadonlyMap<Identifier, Binding>;
    private readonly dependencyResolver: DependencyResolver;

    public constructor(providers: ReadonlyArray<Provider>) {
        this.bindings = this.createBindings(providers);
        this.dependencyResolver = new DependencyResolver(this.bindings);
    }

    private createBinding(provider: Provider): Binding {
        if (isClassProvider(provider) || isFactoryProvider(provider)) {
            switch (provider.lifetime ?? Lifetime.SINGLETON) {
                case Lifetime.TRANSIENT: return new TransientBinding(provider);
                case Lifetime.SINGLETON: return new SingletonBinding(provider);
            }
        }

        if (isExistingProvider(provider)) {
            return new TransientBinding(provider);
        }

        return new SingletonBinding(provider);
    }

    private createBindings(providers: ReadonlyArray<Provider>): ReadonlyMap<Identifier, Binding> {
        const bindings: Map<Identifier, Binding> = new Map();

        bindings.set(
            Injector,
            new SingletonBinding({
                identifier: Injector,
                useValue: this,
            }),
        );

        for (const provider of providers) {
            if (bindings.has(provider.identifier)) {
                throw new Error(`Ambiguous match found.\nIdentifier: ${stringifyIdentifier(provider.identifier)}`);
            }

            bindings.set(provider.identifier, this.createBinding(provider));
        }

        return bindings;
    }

    public has(identifier: Identifier): boolean {
        return this.bindings.has(identifier);
    }

    public async get<T = unknown>(identifier: Identifier<T>, optional?: boolean): Promise<undefined | T>;
    public async get<T = unknown>(identifier: Identifier<T>, optional?: false): Promise<T>;
    public async get<T = unknown>(identifier: Identifier<T>, optional: boolean = false): Promise<undefined | T> {
        const dependency: Dependency = {
            identifier,
            optional,
        };
        const resolutionRequest: ResolutionRequest = ResolutionRequest.create(dependency);
        const resolvedValue: unknown = await this.dependencyResolver.resolve(resolutionRequest);

        return resolvedValue as undefined | T;
    }
}
