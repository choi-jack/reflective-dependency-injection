export interface Class<T = unknown> {
    new(...args: ReadonlyArray<any>): T;
    readonly prototype: T;
}
