export interface Class<Instance extends object = object> {
    new(...args: ReadonlyArray<any>): Instance;

    readonly prototype: Instance;
}
