import paginator, {Paginator} from "@/src/paginator";
import prisma from "@/lib/prisma";
import IReadModel from "./_IReadModel";

interface Filter {
    eventId: number
}

class Model implements IReadModel {
    private model: Paginator;

    constructor() {
        this.model = paginator(prisma.plan);
    }

    includeItems(): this {
        this.model.include({
            items: {}
        });

        return this;
    }

    filter({eventId}: Filter): this {
        this.model.filter({
            event: {id: Number(eventId)}
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
