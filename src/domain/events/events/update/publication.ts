import prisma from "@/lib/prisma";

enum State {
    notValid = -1,
    hide = 0,
    request = 5,
    valid = 10,
}

const action = async (state: State, id: number): Promise<object> => {

    const model: any = await prisma.event.findFirst({where: {id}})

    /**
     * TODO 2. Нету админки, сделал заглушку флагом.
     */
    const publication: number = state

    const data: any = {publication};

    return prisma.event.update({
        where: {
            id: Number(id)
        },
        data
    });
};

export default action;
