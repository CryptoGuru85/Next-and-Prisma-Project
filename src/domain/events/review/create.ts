import prisma from '@/lib/prisma'
import {
    schema as reviewSchema,
    validate as validateReview
} from '@/src/validators/review'
import ReviewModel from '@/src/read_models/ReviewModel';

const reviewModel = new ReviewModel();

interface IData {
    bread: number;
    eventId: number;
}

const action = async (data: IData, id: number): Promise<object> => {
    data.eventId = Number(id);
    data.bread = await reviewModel.filter({eventId: data.eventId}).count() + 1;

    await validateReview(data)

    const validInput: any = reviewSchema.cast(data);

    return prisma.review.create({
        data: validInput,
    });
}

export default action;
