import {
    isEmpty,
    isValidEmail,
    isValidURL,
    isValidString,
    isValidNumber,
    isValidObject,
    isArray
} from './validator';

export const registerValidator = (data: any) => {
    const {
        firstName,
        lastName,
        email,
        password,
    } = data;

    if (isEmpty(firstName)) return { isValid: false, msg: 'First name is required' };
    if (!isValidString(firstName)) return { isValid: false, msg: 'First name must be charactor' };
    if (isEmpty(lastName)) return { isValid: false, msg: 'Last name is required' };
    if (!isValidString(lastName)) return { isValid: false, msg: 'Last name must be charactor' };
    if (!isValidEmail(email)) return { isValid: false, msg: 'Invalid email' };
    if (isEmpty(password)) return { isValid: false, msg: 'password is required' };

    return { isValid: true };
}