import joi from "joi";

const signup = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phoneNumber:joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    address:joi.string().required(),

});