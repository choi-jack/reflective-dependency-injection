import { Binding } from '../bindings.js';
import { getOwnDependencies } from '../dependency-reflector.js';
import { Dependency } from '../dependency.js';
import { Identifier, stringifyIdentifier } from '../identifier.js';
import { Provider, isClassProvider, isExistingProvider, isFactoryProvider } from '../providers.js';
import { InjectionContext } from './injection-context.js';
import { ResolutionRequest } from './resolution-request.js';
import { Resolver } from './resolver.js';

function stringifyResolutionPath(resolutionPath: ReadonlyArray<Identifier>): string {
    return resolutionPath
        .map(stringifyIdentifier)
        .join(' -> ');
}

export class DependencyResolver implements Resolver {
    public constructor(
        private readonly bindings: ReadonlyMap<Identifier, Binding>,
    ) { }

    private detectCircularDependency(request: ResolutionRequest): void {
        if (request.parent === null) {
            return;
        }

        if (request.parent.resolutionPath.includes(request.dependency.identifier)) {
            throw new Error(`Circular dependency detected.\nResolution path: ${stringifyResolutionPath(request.resolutionPath)}`);
        }
    }

    private detectLifetimeMismatch(request: ResolutionRequest, binding: Binding): void {
        /**
         * Transient -> Transient
         * Transient -> Scoped
         * Transient -> Singleton
         *
         * Scoped -> Scoped
         * Scoped -> Singleton
         *
         * Singleton -> Singleton
         */
        if (request.longestLifetime !== null && request.longestLifetime > binding.lifetime) {
            throw new Error(`Lifetime mismatch detected.\nResolution path: ${stringifyResolutionPath(request.resolutionPath)}`);
        }

        request.longestLifetime = binding.lifetime;
    }

    private async resolveDependencies(request: ResolutionRequest, dependencies: ReadonlyArray<Dependency>): Promise<ReadonlyArray<unknown>> {
        const promises: ReadonlyArray<Promise<unknown>> = dependencies.map((dependency: Dependency): Promise<unknown> => this.resolve(request.fork(dependency)));

        return await Promise.all(promises);
    }

    private async resolveProvider(request: ResolutionRequest, provider: Provider): Promise<unknown> {
        if (isClassProvider(provider)) {
            const dependencies: null | ReadonlyArray<Dependency> = getOwnDependencies(provider.useClass);

            if (dependencies === null) {
                throw new Error(`Constructor is not injectable.\nConstructor: ${provider.useClass}`);
            }

            const args: ReadonlyArray<unknown> = await this.resolveDependencies(request, dependencies);

            return new provider.useClass(...args);
        }

        if (isExistingProvider(provider)) {
            const forkedRequest: ResolutionRequest = request.fork({
                identifier: provider.useExisting,
                optional: request.dependency.optional,
            });

            return await this.resolve(forkedRequest);
        }

        if (isFactoryProvider(provider)) {
            const context: InjectionContext = new InjectionContext(this, this.bindings, request);

            // eslint-disable-next-line @typescript-eslint/return-await
            return await provider.useFactory(context);
        }

        return provider.useValue;
    }

    private async resolveBinding(request: ResolutionRequest, binding: Binding): Promise<unknown> {
        this.detectCircularDependency(request);
        this.detectLifetimeMismatch(request, binding);

        if (binding.isResolved()) {
            return binding.getResolvedValue();
        }

        const resolution: Promise<unknown> = this.resolveProvider(request, binding.provider);

        void binding.resolve(resolution);

        return await resolution;
    }

    public async resolve(request: ResolutionRequest): Promise<unknown> {
        const binding: undefined | Binding = this.bindings.get(request.dependency.identifier);

        if (binding === undefined) {
            if (request.dependency.optional) {
                return undefined;
            }

            throw new Error(`No provider found.\nIdentifier: ${stringifyIdentifier(request.dependency.identifier)}`);
        }

        return await this.resolveBinding(request, binding);
    }
}
