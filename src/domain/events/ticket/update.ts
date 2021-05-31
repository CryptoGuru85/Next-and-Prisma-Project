import prisma from '@/lib/prisma'
import {
    schema as ticketSchema,
    validate as validateTicket
} from '@/src/validators/ticket'

import {
    schema as ticketItemSchema,
    validate as validateTicketItem
} from '@/src/validators/ticketItem'
import Error from "@/src/exceptions/type/Error";

interface IData {
    items?: object[];
    ticketId?: number;
}

const getId = (data: IData) => {
    const id = data.ticketId;
    delete data.ticketId;

    if (!id) {
        throw new Error(`Error: "ticketId" is required`);
    }

    return Number(id);
}

const action = async (data: IData): Promise<object> => {
    const items = data.items || [];
    delete data.items;

    const ticketId = getId(data);
    await validateTicket(data)

    const validInput: any = ticketSchema.cast(data);

    // удаление старых значений из мультиселектов
    await prisma.ticketItems.deleteMany({
        where: {
            ticketId
        }
    });

    const ticket = await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: validInput,
    });

    if (Array.isArray(items)) {
        for await (let item of items) {
            const vData = {
                ...item,
                userId: ticket.userId,
                ticketId: ticket.id
            };
            await validateTicketItem(vData);
            const data = ticketItemSchema.cast(vData);
            await prisma.ticketItems.create({
                data: data as any,
            })
        }
    }

    return ticket;
}

export default action;
