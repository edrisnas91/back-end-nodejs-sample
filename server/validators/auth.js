const { Joi } = require('express-validation');

const loginAdmin = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(6).max(30).required(),
  }),
};

const loginClient = {
  body: Joi.object({
    phone: Joi.string()
      .min(6)
      .max(15)
      .regex(/^([+][1-9][0-9\s]*)$/)
      .required(),
    verifyCode: Joi.number().min(1000).max(1000000).required(),
  }),
};

const verifyCode = {
  body: Joi.object({
    phone: Joi.string()
      .min(6)
      .max(15)
      .regex(/^([+][1-9][0-9\s]*)$/)
      .required(),
  }),
};

const auth = {
  loginAdmin,
  loginClient,
  verifyCode,
};
module.exports = auth;
