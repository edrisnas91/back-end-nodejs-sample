const { ValidationError } = require('express-validation');

const validationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
};

module.exports = validationError;
