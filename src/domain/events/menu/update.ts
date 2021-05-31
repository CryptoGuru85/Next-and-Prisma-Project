import prisma from '@/lib/prisma'
import {
    schema as menuSchema,
    validate as validateMenu
} from '@/src/validators/menu'
import Error from "@/src/exceptions/type/Error";

function getConnectParams(key: string, objects: Array<any>): Array<object> {
    return objects.map((value: number) => {
        return {[key]: Number(value)}
    });
}

interface IData {
    menuId?: number;
}

const action = async (data: IData): Promise<object> => {
    const menuId = data.menuId
    delete data.menuId

    if (!menuId) {
        throw new Error(`Error: "menuId" is required`);
    }

    await validateMenu(data);

    // удаление старых значений из мультиселектов
    await prisma.menuKitchens.deleteMany({
        where: {
            menuId: Number(menuId)
        }
    });
    await prisma.menuSpecialMenu.deleteMany({
        where: {
            menuId: Number(menuId)
        }
    });
    await prisma.menuFacilities.deleteMany({
        where: {
            menuId: Number(menuId)
        }
    });

    const validInput = menuSchema.cast(data)

    return prisma.menu.update({
        where: {
            id: Number(menuId)
        },
        data: {
            images: {
                menu: validInput.menu,
                fullMenu: validInput.fullMenu
            },
            averagePrice: Number(validInput.averagePrice),
            facilities: {
                create: getConnectParams('facilityId', validInput.facilities) as any,
            },
            specialMenu: {
                create: getConnectParams('specialMenuId', validInput.specialMenu) as any,
            },
            kitchens: {
                create: getConnectParams('kitchenId', validInput.kitchens) as any
            }
        },
    });
}

export default action;
