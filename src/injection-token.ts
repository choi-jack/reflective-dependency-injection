export class InjectionToken<T> {
    /**
     * This is for type safety and the value is null.
     */
    public readonly type: null | T;

    public constructor(
        public readonly name: string,
    ) {
        this.type = null;
    }

    public toString(): string {
        return `InjectionToken(${this.name})`;
    }
}
