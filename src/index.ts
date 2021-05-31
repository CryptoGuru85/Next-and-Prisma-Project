import {NextApiRequest, NextApiResponse} from 'next';
import requestMethodPath, {RequestPath} from "./resolver/request";
import responseSend from "./resolver/response";
import defaultHandler from "./exceptions/handlers";

const kernel = (requestPath: RequestPath) => async (req: NextApiRequest, res: NextApiResponse) => {
    const beforeController = defaultHandler(async () => {
        const callAction = requestMethodPath(requestPath);
        return callAction(req, res);
    });

    const sendResponse = defaultHandler(async () => {
        const actionData = await beforeController();
        return responseSend(res, actionData);
    });

    return sendResponse();
}

export default kernel;
