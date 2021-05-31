import kernel from '@/src/index';
import EventModel from '@/src/read_models/EventModel';
import create from "@/src/domain/events/events/create";
import {RequestParams} from "@/src/resolver/request";

const eventModel = new EventModel();

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionGet = async (): Promise<object> => {
    return eventModel.all();
}

const actionPost = async ({body}: RequestParams): Promise<object> => {
    return create({
        ...body,
        userId: 1
    });
}

export default kernel({
    get: actionGet,
    post: actionPost
});
