import Joi from 'joi';

export const registerValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string(),
  phoneNumber: Joi.string(),
  birthDate: Joi.string(),
  balance: Joi.number()
})

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const authValidationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};