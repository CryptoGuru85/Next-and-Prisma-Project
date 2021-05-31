import kernel from '@/src/index';
import ClubModel from '@/src/read_models/ClubModel';
import {RequestParams} from "@/src/resolver/request";

const clubModel = new ClubModel();

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionGet = async (): Promise<object> => {
    return clubModel.all();
}

export default kernel({
    get: actionGet
});
