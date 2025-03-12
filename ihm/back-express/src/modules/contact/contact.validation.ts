import Joi from 'joi';

export const contactValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  }),
};
