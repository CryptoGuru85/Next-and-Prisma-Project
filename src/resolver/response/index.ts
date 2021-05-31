import {NextApiResponse} from 'next';
import BaseError from "@/src/exceptions/type/BaseError";

interface ResponseData {
    status: boolean;
    data: object;
}

interface ResponseError {
    name: string;
    message: string;
}

const errorFormat = (data: Error): ResponseError => ({name: data.name, message: data.message} as ResponseError);

const responseFormat = (data: object, status: boolean = true): ResponseData => ({status, data});

const responseHandler = async (
    res: NextApiResponse,
    response: object,
    code: number
): Promise<void> => res.status(code).json(response);

const response = async (res: NextApiResponse, response: object): Promise<void> => {
    if (response instanceof BaseError) {
        return responseHandler(res, responseFormat(errorFormat(response), false), response.getCode());
    }
    if (response instanceof Error) {
        return responseHandler(res, responseFormat(errorFormat(response), false), 500);
    }

    return responseHandler(res, responseFormat(response), 200);
}

export default response;

