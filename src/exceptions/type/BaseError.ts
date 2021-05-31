class BaseError extends Error {
    protected code: number = 500;

    getCode() {
        return this.code;
    }
}


export default BaseError;
