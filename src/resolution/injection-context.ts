import { Binding } from '../bindings.js';
import { Context } from '../context.js';
import { Identifier } from '../identifier.js';
import { ResolutionRequest } from './resolution-request.js';
import { Resolver } from './resolver.js';

export class InjectionContext implements Context {
    public constructor(
        private readonly resolver: Resolver,
        private readonly bindings: ReadonlyMap<Identifier, Binding>,
        private readonly request: ResolutionRequest,
    ) { }

    public has(identifier: Identifier): boolean {
        return this.bindings.has(identifier);
    }

    public async get(identifier: Identifier, optional: boolean = false): Promise<unknown> {
        const forkedRequest: ResolutionRequest = this.request.fork({
            identifier,
            optional,
        });

        return await this.resolver.resolve(forkedRequest);
    }
}
