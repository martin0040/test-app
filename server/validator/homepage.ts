const { isEmpty, isValidString } = require("./validator");

export const homepageValidator = (data: any) => {
    const {
        url,
        title,
        description,
    } = data;

    if (isEmpty(title)) return { isValid: false, msg: 'Title is required' };
    if (!isValidString(title)) return { isValid: false, msg: 'Title must be charactor' };
    if (isEmpty(url)) return { isValid: false, msg: 'URL must be charactor' };
    if (isEmpty(description)) return { isValid: false, msg: 'Description is required' };
    if (!isValidString(description)) return { isValid: false, msg: 'Description must be charactor' };

    return { isValid: true };
}