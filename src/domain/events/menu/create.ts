import prisma from '@/lib/prisma'
import {schema as menuSchema, validate as validateMenu} from '@/src/validators/menu'


function getConnectParams(key: string, objects: string[]): any {
    return objects.map((value): object => {
        return {[key]: Number(value)}
    });
}

const action = async (data: object, id: number): Promise<object> => {
    await validateMenu(data)

    const validInput: any = menuSchema.cast(data);

    return prisma.menu.create({
        data: {
            images: {
                menu: validInput.menu,
                fullMenu: validInput.fullMenu
            },
            averagePrice: Number(validInput.averagePrice),
            facilities: {
                create: getConnectParams('facilityId', validInput.facilities),
            },
            specialMenu: {
                create: getConnectParams('specialMenuId', validInput.specialMenu),
            },
            kitchens: {
                create: getConnectParams('kitchenId', validInput.kitchens)
            },
            event: {
                connect: {
                    id: Number(id)
                },
            },
        },
    });
}

export default action;
