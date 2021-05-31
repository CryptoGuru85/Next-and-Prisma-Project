import kernel from "@/src/index";
import ReviewModel from "@/src/read_models/ReviewModel";
import validateQuery from "@/src/lib/validateQuery";
import create from "@/src/domain/events/review/create";
import {RequestParams} from "@/src/resolver/request";

const reviewModel = new ReviewModel();

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

    return reviewModel
        .filter(filter)
        .all();
}

const actionPost = async ({query, body}: RequestParams): Promise<object> => {
    validateQuery(query);

    return create({...body, userId: 1}, +query.id);
}

export default kernel({
    get: actionGet,
    post: actionPost
});
