export interface Class<Instance = object> {
    new(...args: ReadonlyArray<any>): Instance;
    readonly prototype: Instance;
}
