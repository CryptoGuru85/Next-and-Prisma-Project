import {NextApiRequest, NextApiResponse} from 'next';
import Error from "@/src/exceptions/type/Error";
import uploader, {mFiles} from "@/src/uploader";

export interface RequestQuery {
    [key: string]: string | string[]
}

export interface RequestParams {
    query: RequestQuery,
    body: any,
    files: mFiles
}

export interface RequestPath {
    [key: string]: (req: RequestParams) => Promise<any>;
}

const requestMethodPath = (requestPath: RequestPath) => async (req: NextApiRequest, res: NextApiResponse): Promise<object> => {
    const [body, files] = await uploader(req);

    const {query, method, url} = req;
    const params = {query, body, files} as RequestParams;

    const methodName = method?.toLowerCase() || '';

    if (!requestPath[methodName]) {
        res.setHeader('Allow', Object.keys(requestPath).join(', ').toLocaleUpperCase());
        throw new Error(`Error: ${method} ${url} is not a valid URL`);
    }

    return requestPath[methodName](params);
}

export default requestMethodPath;
