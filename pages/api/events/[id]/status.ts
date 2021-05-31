import kernel from "@/src/index";
import updateStatus from "@/src/domain/events/events/update/status";
import validateQuery from "@/src/lib/validateQuery";
import {RequestParams} from "@/src/resolver/request";

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionPut = async ({query}: RequestParams): Promise<object> => {
    validateQuery(query);

    return updateStatus(+query.id);
}

export default kernel({
    put: actionPut
});
