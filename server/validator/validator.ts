export const isEmpty = (data: any) => {
    if (data === null || data === undefined) return true; // Check for null or undefined
    if (Array.isArray(data)) return data.length === 0; // Check for empty array
    if (typeof data === 'object') return Object.keys(data).length === 0; // Check for empty object
    return data === ''; // Check for empty string
};

export const isValidEmail = (email: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
export const isValidString = (str: any) => typeof str === 'string' && str.trim().length > 0;
export const isValidNumber = (num: any) => typeof num === 'number' && !isNaN(num);

export const isValidURL = (url: any) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlPattern.test(url);
};
export const isArray = (value: any) => Array.isArray(value);
export const isValidObject = (obj: any) => {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};
