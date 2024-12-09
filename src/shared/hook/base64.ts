export const encodeBase64 = (data: object | string): string => {
    if (typeof data === 'string') {
        return btoa(encodeURIComponent(data));
    } else if (typeof data === 'object') {
        return btoa(encodeURIComponent(JSON.stringify(data)));
    } else {
        throw new Error('Invalid data type: Only string or object is supported.');
    }
};

export const decodeBase64 = <T>(encodedData: string): T | string => {
    const decodedData = decodeURIComponent(atob(encodedData));
    try {
        return JSON.parse(decodedData) as T;
    } catch {
        return decodedData;
    }
};
