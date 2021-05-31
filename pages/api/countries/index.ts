import kernel from '@/src/index';
import CountryModel from '@/src/read_models/CountryModel';
import {RequestParams} from "@/src/resolver/request";

const countryModel = new CountryModel();

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionGet = async (): Promise<object> => {
    return countryModel.all();
}

export default kernel({
    get: actionGet
});
