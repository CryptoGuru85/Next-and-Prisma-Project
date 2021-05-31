export default interface IReadModel {
    filter(filter: any): this,

    sort(): this,

    count(): Promise<number>,

    all(): Promise<object>,

    one(): Promise<object>,
}
