import kernel from "@/src/index";
import updatePublication from "@/src/domain/events/events/update/publication";
import validateQuery from "@/src/lib/validateQuery";
import {RequestParams} from "@/src/resolver/request";

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionPut = async ({query}: RequestParams): Promise<object> => {
    validateQuery(query);

    /**
     * TODO 1. Статус публикации на какой необходимо изменить, хардкод.
     */
    return updatePublication(0, +query.id);
}

export default kernel({
    put: actionPut
});
