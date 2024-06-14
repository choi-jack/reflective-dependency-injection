import { Lifetime } from '../lifetime.js';
import { Provider } from '../providers.js';

export interface Binding {
    readonly provider: Provider;
    readonly lifetime: Lifetime;

    isResolved(): boolean;
    resolve(resolution: Promise<unknown>): void | Promise<void>;
    getResolvedValue(): unknown;
}
