import prisma from "@/lib/prisma";

const action = async (id: number): Promise<object> => {

    const model: any = await prisma.event.findFirst({where: {id}})
    const status: number = model.status ? 0 : 10

    const data: any = {status};

    return prisma.event.update({
        where: {
            id: Number(id)
        },
        data
    });
};

export default action;
