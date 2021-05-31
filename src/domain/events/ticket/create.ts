import prisma from '@/lib/prisma'
import {
    schema as ticketSchema,
    validate as validateTicket
} from '@/src/validators/ticket'

import {
    schema as ticketItemSchema,
    validate as validateTicketItem
} from '@/src/validators/ticketItem'

interface IData {
    items?: object[];
    eventId: number;
}

const action = async (data: IData, id: number): Promise<object> => {
    const items = data.items || [];
    delete data.items;
    data.eventId = Number(id);

    await validateTicket(data)

    const validInput: any = ticketSchema.cast(data);

    const ticket = await prisma.ticket.create({
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
