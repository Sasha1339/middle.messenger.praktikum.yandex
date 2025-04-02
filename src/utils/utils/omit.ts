function omit<T extends Record<string, any>, K extends keyof T>(obj: T, fields: K[]) {
    const objCopy = { ...obj };
    for (const key of fields) {
        delete objCopy[key];
    }
    return objCopy;
}

export default omit;
