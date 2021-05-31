import Error from "@/src/exceptions/type/Error";
import {RequestQuery} from "@/src/resolver/request";

const validateQuery = (query: RequestQuery): void => {
    const id: number = +query.id;

    if (!id) {
        throw new Error(`Error: "id" required`);
    }

    if (typeof parseInt(id.toString()) !== 'number') {
        throw new Error(`Error: "id" must be a number`);
    }
}

export default validateQuery;
