import { Lifetime } from '../lifetime.js';
import { ClassProvider, ExistingProvider, FactoryProvider } from '../providers.js';
import { Binding } from './binding.js';

export class TransientBinding implements Binding {
    public readonly lifetime: Lifetime;

    public constructor(
        public readonly provider: ClassProvider | ExistingProvider | FactoryProvider,
    ) {
        this.lifetime = Lifetime.TRANSIENT;
    }

    public isResolved(): boolean {
        return false;
    }

    public resolve(_resolution: Promise<unknown>): void { }

    public getResolvedValue(): unknown {
        throw new Error('Unsupported operation.');
    }
}
