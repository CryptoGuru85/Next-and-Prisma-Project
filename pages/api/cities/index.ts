import kernel from '@/src/index';
import CityModel from '@/src/read_models/CityModel';
import {RequestParams} from "@/src/resolver/request";

const cityModel = new CityModel();

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionGet = async (): Promise<object> => {
    return cityModel.all();
}

export default kernel({
    get: actionGet
});
