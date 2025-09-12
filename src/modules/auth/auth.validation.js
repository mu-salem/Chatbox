import joi from "joi";

export const register = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    phoneNumber:joi.string().required(),
});


export const login = joi.object({
    email: joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
});

export const googleAuth = joi.object({
    token: joi.string().required(),
});

export const sendForgetPasswordCode = joi.object({
    email: joi.string().email().required(),
});

export const verifyForgetPasswordCode = joi.object({
    email: joi.string().email().required(),
    code: joi.string().length(6).required(),
});

export const resetPassword = joi.object({
    email: joi.string().email().required(),
    newPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    confirmPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
});
