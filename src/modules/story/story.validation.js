import joi from "joi";

export const createStory = joi.object({
    file: joi
      .object({
        fieldname: joi.string().valid("story").required(),
        originalname: joi.string().required(),
        mimetype: joi
          .string()
          .required(),
        size: joi
          .number()
          .max(10 * 1024 * 1024)  
          .required(),
      })
      .unknown(true)
      .required(),
  })
  .required();

export const getStoryById = joi.object({});



