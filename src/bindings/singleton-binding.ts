import { Lifetime } from '../lifetime.js';
import { ClassProvider, FactoryProvider, ValueProvider } from '../providers.js';
import { Binding } from './binding.js';

export class SingletonBinding implements Binding {
    public readonly lifetime: Lifetime;

    private resolved: boolean;
    private value: unknown;

    public constructor(
        public readonly provider: ClassProvider | FactoryProvider | ValueProvider,
    ) {
        this.lifetime = Lifetime.SINGLETON;

        this.resolved = false;
        this.value = null;
    }

    public isResolved(): boolean {
        return this.resolved;
    }

    public async resolve(resolution: Promise<unknown>): Promise<void> {
        this.resolved = true;
        this.value = resolution;

        try {
            this.value = await resolution;
        }
        catch {
            this.resolved = false;
            this.value = null;
        }
    }

    public getResolvedValue(): unknown {
        return this.value;
    }
}
