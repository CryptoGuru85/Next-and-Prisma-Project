import kernel from "@/src/index";
import TicketModel from "@/src/read_models/TicketModel";
import create from "@/src/domain/events/ticket/create";
import update from "@/src/domain/events/ticket/update";
import validateQuery from "@/src/lib/validateQuery";
import {RequestParams} from "@/src/resolver/request";

const ticketModel = new TicketModel();

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionGet = async ({query}: RequestParams): Promise<object> => {
    validateQuery(query);

    const filter = {
        eventId: +query.id
    };

    return ticketModel
        .includeItems()
        .filter(filter)
        .all();
}

const actionPost = async ({query, body}: RequestParams): Promise<object> => {
    validateQuery(query);

    return create({...body, userId: 1}, +query.id);
}

const actionPut = async ({query, body}: RequestParams): Promise<object> => {
    validateQuery(query);

    return update({...body, userId: 1});
}

export default kernel({
    get: actionGet,
    post: actionPost,
    put: actionPut
});
