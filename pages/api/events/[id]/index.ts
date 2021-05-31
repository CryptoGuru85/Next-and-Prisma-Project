import kernel from "@/src/index";
import _delete from "@/src/domain/events/events/delete";
import update from "@/src/domain/events/events/update";
import validateQuery from "@/src/lib/validateQuery";
import EventModel from "@/src/read_models/EventModel";
import {RequestParams} from "@/src/resolver/request";

const eventModel = new EventModel();

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionGet = async ({query}: RequestParams): Promise<object> => {
    validateQuery(query);

    const filter = {
        id: +query.id
    };

    return eventModel
        .includeRegion()
        .filter(filter)
        .one();
}

const actionPut = async ({query, body}: RequestParams): Promise<object> => {
    validateQuery(query);

    return update({...body, userId: 1}, +query.id);
}

const actionDelete = async ({query}: RequestParams): Promise<object> => {
    validateQuery(query);

    return _delete(+query.id);
}

export default kernel({
    get: actionGet,
    put: actionPut,
    delete: actionDelete,
});
