import kernel from "@/src/index";
import PlanModel from "@/src/read_models/PlanModel";
import validateQuery from "@/src/lib/validateQuery";
import create from "@/src/domain/events/plan/create";
import update from "@/src/domain/events/plan/update";
import {RequestParams} from "@/src/resolver/request";

const planModel = new PlanModel();

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

    return planModel
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
