import { Dependency } from '../dependency.js';
import { Identifier } from '../identifier.js';
import { Lifetime } from '../lifetime.js';

export class ResolutionRequest {
    public static create(dependency: Dependency): ResolutionRequest {
        return new ResolutionRequest(null, dependency);
    }

    public readonly resolutionPath: ReadonlyArray<Identifier>;

    public longestLifetime: null | Lifetime;

    private constructor(
        public readonly parent: null | ResolutionRequest,
        public readonly dependency: Dependency,
    ) {
        if (this.parent === null) {
            this.resolutionPath = [this.dependency.identifier];
            this.longestLifetime = null;
        }
        else {
            this.resolutionPath = this.parent.resolutionPath.concat(this.dependency.identifier);
            this.longestLifetime = this.parent.longestLifetime;
        }
    }

    public fork(dependency: Dependency): ResolutionRequest {
        return new ResolutionRequest(this, dependency);
    }
}
