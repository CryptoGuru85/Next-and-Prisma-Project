import paginator, {Paginator} from "@/src/paginator";
import prisma from "@/lib/prisma";
import IReadModel from "@/src/read_models/_IReadModel";

interface Filter {
    id: number
}

class Model implements IReadModel {
    private model: Paginator;

    constructor() {
        this.model = paginator(prisma.city);
    }

    includeRegion(): this {
        this.model.include({
            region: true,
        });

        return this;
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
