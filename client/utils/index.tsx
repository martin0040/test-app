export const API_BASE_URL = "http://localhost:5000";
export const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

