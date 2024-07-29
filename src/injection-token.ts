export class InjectionToken<Type = unknown> {
    /**
     * This field is for type safety. The runtime value is null.
     */
    public readonly type: null | Type;

    public constructor(
        public readonly description: string = '',
    ) {
        this.type = null;
    }

    public toString(): string {
        return `InjectionToken(${this.description})`;
    }
}
