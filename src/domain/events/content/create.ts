import {schema as contentSchema, validate as validateContent} from "@/src/validators/content";
import prisma from "@/lib/prisma";

export interface IData {
    videoOverviewLink: string | null;
    userId: string | null;
    tourLink: string | null;
    about: string | null;
    logo: string | null;
    eventPictures?: string[] | null;
    videoOverview?: string[] | null;
    media?: object;
}

const action = async (data: IData, id: number): Promise<object> => {
    await validateContent(data);

    const validInput: any = contentSchema.cast(data);
    validInput.media = {
        eventPictures: validInput.eventPictures,
        videoOverview: validInput.videoOverview
    }

    delete validInput.eventPictures;
    delete validInput.videoOverview;

    return prisma.content.create({
        data: {
            ...validInput,
            event: {
                connect: {
                    id: Number(id)
                },
            },
        },
    });
}

export default action;
