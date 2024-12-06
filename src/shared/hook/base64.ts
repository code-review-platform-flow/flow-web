export const encodeBase64 = (data: object): string => {
    return btoa(encodeURIComponent(JSON.stringify(data)));
};

export const decodeBase64 = <T>(encodedData: string): T => {
    return JSON.parse(decodeURIComponent(atob(encodedData))) as T;
};
