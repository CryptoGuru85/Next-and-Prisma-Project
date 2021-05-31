import paginator, {Paginator} from "@/src/paginator";
import prisma from "@/lib/prisma";
import IReadModel from "./_IReadModel";

export interface Filter {
    id: number
}

class Model implements IReadModel {
    private model: Paginator;

    constructor() {
        this.model = paginator(prisma.event);
        this.model.include({
            content: true,
        });
    }

    filter({id}: Filter): this {
        this.model.filter({
            id: Number(id)
        });

        return this;
    }

    sort(): this {
        return this;
    }

    async count(): Promise<number> {
        return this.model.countItems();
    }

    async all(): Promise<object> {
        return this.model.findMany();
    }

    async one(): Promise<object> {
        return this.model.findOne();
    }
}

export default Model;
