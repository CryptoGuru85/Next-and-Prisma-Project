import {schema as eventSchema, validate as validateEvent} from "@/src/validators/event";
import prisma from "@/lib/prisma";

interface Data {
    userId: string | number,
    videoOverviewLink: string | null,
    tourLink: string | null,
    about: string | null,
    logo: string | null,
    eventPictures: string[] | null,
    videoOverview: string[] | null,
}

const action = async (data: Data, id: number): Promise<object> => {
    await validateEvent(data);

    return prisma.event.update({
        where: {
            id: Number(id)
        },
        data: eventSchema.cast(data)
    });
};

export default action;
