import prisma from '@/lib/prisma'
import {
    schema as planSchema,
    validate as validatePlan
} from '@/src/validators/plan'

import {
    schema as planItemSchema,
    validate as validatePlanItem
} from '@/src/validators/planItem'
import Error from "@/src/exceptions/type/Error";

interface IData {
    items?: object[];
    planId?: number;
}

const getId = (data: IData) => {
    const id = data.planId;
    delete data.planId;

    if (!id) {
        throw new Error(`Error: "planId" is required`);
    }

    return Number(id);
}

const action = async (data: IData): Promise<object> => {
    const items = data.items || [];
    delete data.items;

    const planId = getId(data);
    await validatePlan(data)

    const validInput: any = planSchema.cast(data);

    // удаление старых значений из мультиселектов
    await prisma.planItems.deleteMany({
        where: {
            planId
        }
    });

    const plan = await prisma.plan.update({
        where: {
            id: planId
        },
        data: validInput,
    });

    if (Array.isArray(items)) {
        for await (let item of items) {
            const vData = {
                ...item,
                userId: plan.userId,
                planId: plan.id
            };
            await validatePlanItem(vData);
            const data = planItemSchema.cast(vData);
            await prisma.planItems.create({
                data: data as any,
            })
        }
    }

    return plan;
}

export default action;
