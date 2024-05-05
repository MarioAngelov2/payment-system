import Joi from "joi";

export const createCardValidation = Joi.object({
  cardNumber: Joi.string().required(),
  cardHolder: Joi.string().required(),
  expirationDate: Joi.string().required(),
  userId: Joi.string().required(),
});

export const deleteCardValidation = Joi.object({
  id: Joi.string().required(),
});

export const getCardsValidation = Joi.object({
  id: Joi.string().required(),
});

export const cardValidationMiddleware = (schema) => (req, res, next) => {
  if (schema === createCardValidation && req.body) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }

  if (schema !== createCardValidation && req.params) {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }

  next();
};
