import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.meddleware";

export const updateUser = joi
  .object({
    username: joi.string().min(3).max(30),
    phoneNumber: joi.string(),
    address: joi.string().max(100),
  })
  .required();

export const updatePassword = joi
  .object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  })
  .required();

export const updateProfilePic = joi.object({
  file: joi.object({
    fieldname: joi.string().valid("image").required(),
    originalname: joi.string().required(),
    mimetype: joi
      .string()
      .valid("image/png", "image/jpeg", "image/jpg", "image/webp")
      .required(),
    size: joi.number().max(2 * 1024 * 1024).required(), 
  }).required(),
}).required();


export const getUserByName = joi.object({
  name: joi.string().min(2).max(50).required()
}).required();

export const searchUsers = joi.object({
  name: joi.string().min(2).max(50),
  email: joi.string().email(),
  phoneNumber: joi.string(),
}).or("name", "email", "phoneNumber") 
  .required();

export const addContact = joi.object({
  id: joi.custom(isValidObjectId).required(), 
}).required();

export const removeContact = joi.object({
  id: joi.custom(isValidObjectId).required(), 
}).required();

