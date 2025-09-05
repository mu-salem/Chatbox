import joi from "joi";
import { OTP_TYPES } from "../../utils/constants/subjects.js";
import e from "express";

export const signup = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phoneNumber:joi.string().required(),
});

export const confirmOTP = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().length(6).required(),
    type: joi.string().valid(...Object.values(OTP_TYPES)).required(),
});

export const signin = joi.object({
    email: joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const googleAuth = joi.object({
    token: joi.string().required(),
});

export const sendForgetPasswordCode = joi.object({
    email: joi.string().email().required(),
});

export const forgetPassword = joi.object({
    email: joi.string().email().required(),
    code: joi.string().length(6).required(),
});

export const resetPassword = joi.object({
    email: joi.string().email().required(),
    newPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const refreshToken = joi.object({
    refreshToken: joi.string().required(),
});