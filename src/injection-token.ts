export class InjectionToken<_T = unknown> {
    public constructor(
        public readonly name: string,
    ) { }

    public toString(): string {
        return `InjectionToken(${this.name})`;
    }
}
