import prisma from '@/lib/prisma'
import {
    schema as planSchema,
    validate as validatePlan
} from '@/src/validators/plan'

import {
    schema as planItemSchema,
    validate as validatePlanItem
} from '@/src/validators/planItem'

interface IData {
    items?: object[];
    eventId: number;
    name: string;
}

const action = async (data: IData, id: number): Promise<object> => {
    const items = data.items || [];
    delete data.items;
    data.eventId = Number(id);

    await validatePlan(data)

    const validInput: any = planSchema.cast(data);

    const plan = await prisma.plan.create({
        data: validInput,
    });

    if (Array.isArray(items)) {
        for (let item of items) {
            const vData = {
                ...item,
                userId: plan.userId,
                planId: plan.id
            };
            await validatePlanItem(vData);
            const data: any = planItemSchema.cast(vData);
            await prisma.planItems.create({
                data
            })
        }
    }

    return plan;
}

export default action;
