const jwt = require('jsonwebtoken');
const config = require('../config/config');

function validate(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ Message: 'Not Allowed' });
  }
}

const issue = (user) => {
  const { id } = user;
  const expiresIn = '1w';
  const payload = {
    me: id,
    type: user.accessType ? user.accessType : 'client',
    at: Date.now(),
  };
  const signedToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn,
  });

  return {
    tocken: `Bearer ${signedToken}`,
    expiresIn,
  };
};

module.exports = {
  validate,
  issue,
};
