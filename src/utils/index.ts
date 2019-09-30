export const promisify = (fnWithCallback: (...args: any) => void) =>
    (...args: any) =>
        new Promise((resolve, reject) =>
            fnWithCallback(
                ...args,
                (err: Error, result: any) => {
                    resolve(result);
                    reject(err);
                }
            )
        )