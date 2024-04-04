const { Joi } = require('express-validation');
const {
  adminAccessTypes,
  sortOrderTypes,
  adminStatusTypes,
} = require('../enum');
const { Admins } = require('../models');

// req.body: the body of the HTTP request. Can be any value, however objects, arrays and other JavaScript primitives work better.
// req.cookies: the Cookie header parsed as an object from cookie name to its value.
// req.headers: the headers sent along with the HTTP request.
// req.params: an object from name to value.
//      In express.js, this is parsed from the request path and matched with route definition path, but it can really be anything meaningful coming from the HTTP request.
// req.query: the portion after the ? in the HTTP request's path, parsed as an object from query parameter name to value.

const create = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(6).max(30).required(),
    accessType: Joi.string()
      .valid(...Object.values(adminAccessTypes))
      .default(adminAccessTypes.OPERATOR)
      .optional(),
    status: Joi.string()
      .valid(...Object.values(adminStatusTypes))
      .default(adminStatusTypes.ACTIVE)
      .optional(),
  }),
};

const update = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(30).optional(),
    lastName: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    password: Joi.string().alphanum().min(6).max(30).optional(),
    accessType: Joi.string()
      .valid(...Object.values(adminAccessTypes))
      .default(adminAccessTypes.OPERATOR)
      .optional(),
    status: Joi.string()
      .valid(...Object.values(adminStatusTypes))
      .default(adminStatusTypes.ACTIVE)
      .optional(),
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
      .valid(...Object.keys(Admins.getAttributes()))
      .optional(),
  }),
};

const admin = {
  create,
  update,
  index,
};
module.exports = admin;
