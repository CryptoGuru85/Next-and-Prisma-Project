import kernel from "@/src/index";
import {uploadFile} from "@/src/uploader";
import MenuModel from "@/src/read_models/MenuModel";
import validateQuery from "@/src/lib/validateQuery";
import create from "@/src/domain/events/menu/create";
import update from "@/src/domain/events/menu/update";
import {RequestParams} from "@/src/resolver/request";

const menuModel = new MenuModel();

export const config = {
    api: {
        bodyParser: false,
    },
};

const actionGet = async ({query}: RequestParams): Promise<object> => {
    validateQuery(query);

    const filter = {
        eventId: +query.id,
    };

    const menu: any = await menuModel
        .includeFacilities()
        .includeKitchen()
        .includeSpecialMenu()
        .filter(filter)
        .one();

    return {
        ...menu,
        facilities: menu?.facilities.map((i: any): object => ({
            id: i.facility.id,
            name: i.facility.name,
        })),
        kitchens: menu?.kitchens.map((i: any): object => ({
            id: i.kitchen.id,
            name: i.kitchen.name,
        })),
        specialMenu: menu?.specialMenu.map((i: any): object => ({
            id: i.specialMenu.id,
            name: i.specialMenu.name,
        })),
    };
}

const actionPost = async ({query, body, files}: RequestParams): Promise<object> => {
    validateQuery(query);

    const data = await uploadFile(body, files);
    const _data = {
        ...data,
        userId: 1
    };

    if (data.menuId) {
        return update({...body, userId: 1});
    }

    return create(_data, +query.id);
}

export default kernel({
    get: actionGet,
    post: actionPost
});
