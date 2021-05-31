import kernel from "@/src/index";
import {uploadFile} from "@/src/uploader";
import validateQuery from "@/src/lib/validateQuery";
import create, {IData} from "@/src/domain/events/content/create";
import update from "@/src/domain/events/content/update";
import ContentModel from "@/src/read_models/ContentModel";
import {RequestParams} from "@/src/resolver/request";

const contentModel = new ContentModel();

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

    return contentModel
        .filter(filter)
        .all();
}

const actionPost = async ({query, body, files}: RequestParams): Promise<object> => {
    validateQuery(query);

    const data = await uploadFile(body, files);
    const _data = {
        ...data,
        userId: 1
    } as any as IData;

    if (data.contentId) {
        return update({...body, userId: 1});
    }

    return create(_data, +query.id);
}

export default kernel({
    get: actionGet,
    post: actionPost
});
