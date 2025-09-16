import joi from "joi";

export const getUserProfile = joi
  .object({
    username: joi.string().min(3).max(30).required(),
  })
  .required();

export const updateProfile = joi
  .object({
    username: joi.string().min(3).max(30).optional(),
    phoneNumber: joi.string().optional(),
    address: joi.string().max(100).optional(),
    bio: joi.string().max(160).optional(),
  })
  .optional();

export const updatePassword = joi
  .object({
    oldPassword: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required(),
    newPassword: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required(),
  })
  .required();

export const updateProfilePic = joi
  .object({
    file: joi
      .object({
        fieldname: joi.string().valid("image").required(),
        originalname: joi.string().required(),
        mimetype: joi
          .string()
          .valid("image/png", "image/jpeg", "image/jpg", "image/webp")
          .required(),
        size: joi
          .number()
          .max(2 * 1024 * 1024)
          .required(),
      })
      .unknown(true)
      .required(),
  })
  .required();

export const getUserByName = joi
  .object({
    username: joi.string().min(1).max(50).required(),
  })
  .required();

export const searchUsers = joi
  .object({
    username: joi.string().min(2).max(50).required(),
  })
  .required();

export const addFriend = joi
  .object({
    username: joi.string().min(3).max(30).required(),
  })
  .required();

export const removeFriend = joi
  .object({
    username: joi.string().min(3).max(30).required(),
  })
  .required();
