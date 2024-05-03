import Joi from "joi";

export const depositValidation = Joi.object({
  cardId: Joi.string().required(),
  amount: Joi.number().required(),
  cardNumber: Joi.string().required(),
});

export const transferValidation = Joi.object({
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
  amount: Joi.number().required(),
  cardNumber: Joi.string().required(),
  cardId: Joi.string().required(),
});

export const getTransactionsValidation = Joi.object({
  userId: Joi.string().required(),
});

export const transactionValidationMiddleware = (schema) => (req, res, next) => {
  if (req.body) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }

  if (req.params) {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }

  next();
};
