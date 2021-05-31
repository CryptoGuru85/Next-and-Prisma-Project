import {schema as contentSchema, validate as validateContent} from "@/src/validators/content";
import prisma from "@/lib/prisma";
import Error from "@/src/exceptions/type/Error";

interface IData {
    contentId?: number;
    videoOverviewLink: string | null;
    tourLink: string | null;
    about: string | null;
    logo: string | null;
    eventPictures?: string | null;
    videoOverview?: string | null;
    media?: object;
}

const action = async (data: IData): Promise<object> => {
    const contentId = data.contentId
    delete data.contentId

    if (!contentId) {
        throw new Error(`Error: "contentId" is required`);
    }

    await validateContent(data)

    const validInput: IData = contentSchema.cast(data);
    validInput.media = {
        eventPictures: validInput.eventPictures,
        videoOverview: validInput.videoOverview
    }

    delete validInput.eventPictures;
    delete validInput.videoOverview;

    return prisma.content.update({
        where: {
            id: Number(contentId)
        },
        data: validInput
    })
}

export default action;
