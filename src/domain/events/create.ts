import {schema as eventSchema, validate as validateEvent} from "@/src/validators/event";
import prisma from "@/lib/prisma";

interface Data {
    author: string | null
    eventName: string
    siteName: string | null
    facebookLink: string | null
    instagramLink: string | null
    twitterLink: string | null
    linkedinLink: string | null
    pinterestLink: string | null
    vkontakteLink: string | null
    phone: string | null
    workingTimeFrom: Date | null
    workingTimeTo: Date | null
    regionId: number | null
    address: string | null
    club: string | null
    mapLink: string | null
    userId: number
}

const action = async (data: Data): Promise<object> => {
    await validateEvent(data);

    return prisma.event.create({
        data: eventSchema.cast(data) as any
    });
};

export default action;
