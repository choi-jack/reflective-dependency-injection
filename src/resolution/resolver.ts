import { ResolutionRequest } from './resolution-request.js';

export interface Resolver {
    resolve(request: ResolutionRequest): Promise<unknown>;
}
