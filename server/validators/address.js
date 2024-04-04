const { Joi } = require('express-validation');
const { sortOrderTypes, productStatusTypes } = require('../enum');
const { Address } = require('../models');

const createByAdmin = {
  body: Joi.object({
    country: Joi.string().min(2).max(30).required(),
    state: Joi.string().min(2).max(30).required(),
    city: Joi.string().min(2).max(30).required(),
    address: Joi.string().min(3).max(500).required(),
    location: Joi.array().length(2).items(Joi.number()).optional(),
    clientId: Joi.number().integer().required(),
  }),
};

const createByClient = {
  body: Joi.object({
    country: Joi.string().min(2).max(30).required(),
    state: Joi.string().min(2).max(30).required(),
    city: Joi.string().min(2).max(30).required(),
    address: Joi.string().min(3).max(500).required(),
    location: Joi.array().length(2).items(Joi.number()).optional(),
  }),
};

const update = {
  body: Joi.object({
    country: Joi.string().min(2).max(30).required(),
    state: Joi.string().min(2).max(30).required(),
    city: Joi.string().min(2).max(30).required(),
    address: Joi.string().min(3).max(500).required(),
    location: Joi.array().length(2).items(Joi.number()).optional(),
  }),
};

const index = {
  query: Joi.object({
    search: Joi.string().min(1).max(30).optional(),
    limit: Joi.number().min(0).max(1000).default(15).optional(),
    skip: Joi.number().min(0).default(0).optional(),
    order: Joi.string()
      .valid(...Object.values(sortOrderTypes))
      .default(sortOrderTypes.DECREASE)
      .optional(),
    orderField: Joi.string()
      .default('createdAt')
      .valid(...Object.keys(Address.getAttributes()))
      .optional(),
    status: Joi.string()
      .valid(...Object.values(productStatusTypes))
      .optional(),
  }),
};

const product = {
  createByAdmin,
  createByClient,
  update,
  index,
};
module.exports = product;
