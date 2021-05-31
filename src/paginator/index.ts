interface Pages {
    page: number,
    count: number
}

export class Paginator {
    private _model;
    private _where?: object = undefined;
    private _orderBy?: object = undefined;
    private _include?: object = undefined;

    private _pages = {
        page: 1,
        count: 20
    } as Pages;

    constructor(model: any) {
        this._model = model;
    }

    async findManyRaw(): Promise<object[]> {
        return this._model.findMany(this.buildSql());
    }

    async countItems(): Promise<number> {
        return this._model.count(this.buildSql(false));
    }

    async findOne(): Promise<object> {
        return this._model.findFirst(this.buildSqlWhere());
    }

    async findMany(): Promise<object> {
        const items = await this.findManyRaw();
        const total = await this.countItems();

        const pages = {
            page: 1,
            pages: Math.ceil(total / this._pages.count),
            count: items.length,
            total,
            per_page: this._pages.count,
        };

        return {
            items,
            pages
        }
    }

    page({page = 1, count = 20}: Pages): this {
        this._pages.page = page;
        this._pages.count = count;
        return this;
    }

    filter(_where: object): this {
        this._where = _where;
        return this;
    }

    include(_include: object): this {
        this._include = {
            ...this._include,
            ..._include
        };
        return this;
    }

    orderBy(_orderBy: object): this {
        this._orderBy = _orderBy;
        return this;
    }

    clearFilters(): void {
        this._where = {};
    }

    clearIncludes(): void {
        this._include = {};
    }

    private buildSql(include: boolean = true): object {
        const page = this.buildSqlPage();
        const where = this.buildSqlWhere(include);

        return {
            ...page,
            ...where,
        }
    }

    private buildSqlWhere(include: boolean = true): object {
        return {
            where: this._where,
            orderBy: this._orderBy,
            include: include ? this._include : undefined
        }
    }

    private buildSqlPage(): object {
        const take = this._pages.count;
        const skip = take * (this._pages.page - 1);

        return {
            take,
            skip,
        }
    }
}

export default (model: object): Paginator => new Paginator(model);
