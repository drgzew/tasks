function deepClone(obj, seen = new Map()) {

    if (obj === null || typeof obj !== "object") return obj;

    if (seen.has(obj)) return seen.get(obj);

    if (obj instanceof Date) return new Date(obj);

    if (obj instanceof Map) {
        const result = new Map();
        seen.set(obj, result);
        obj.forEach((value, key) => result.set(key, deepClone(value, seen)));
        return result;
    }

    if (obj instanceof Set) {
        const result = new Set();
        seen.set(obj, result);
        obj.forEach(value => result.add(deepClone(value, seen)));
        return result;
    }

    if (Array.isArray(obj)) {
        const result = [];
        seen.set(obj, result);
        obj.forEach((item, index) => result[index] = deepClone(item, seen));
        return result;
    }


    const proto = Object.getPrototypeOf(obj);
    const clone = Object.create(proto);

    for (let key of Object.keys(obj)) {
        clone[key] = deepClone(obj[key], seen);
    }

    for (let sym of Object.getOwnPropertySymbols(obj)) {
        clone[sym] = deepClone(obj[sym], seen);
    }

    return clone;
}