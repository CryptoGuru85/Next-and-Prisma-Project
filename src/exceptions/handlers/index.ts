const defaultHandler = (callback: () => Promise<any>) => async (): Promise<any> => {
    try {
        return await callback();
    } catch (e) {
        console.error(e);
        return e;
    }
};

export default defaultHandler;
