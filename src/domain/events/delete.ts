import prisma from "@/lib/prisma";

const action = async (id: number): Promise<object> => {
    await prisma.event.delete({
        where: {
            id: Number(id)
        }
    });

    return {id};
};

export default action;
