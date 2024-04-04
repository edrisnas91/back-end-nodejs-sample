const { jwtDecode } = require('jwt-decode');
const { Admins, Clients } = require('../models');
const { adminAccessTypes, adminStatusTypes } = require('../enum');

const socketJwtAuth = (io, redisClient, socket, next) => {
  try {
    const { request } = socket;
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];
    const payload = jwtDecode(token);
    if (new Date(payload.exp * 1000) > Date.now()) {
      if (
        payload.type === adminAccessTypes.ADMIN ||
        payload.type === adminAccessTypes.OPERATOR
      ) {
        Admins.findOne({
          where: { id: payload.me },
        })
          .then((user) => {
            if (user && user.dataValues.status === adminStatusTypes.ACTIVE) {
              request.user = user;
              next();
            } else {
              next(new Error('User Unauthorized'));
            }
          })
          .catch(() => {
            next(new Error('User Unauthorized'));
          });
      } else {
        Clients.findOne({
          where: { id: payload.me },
        })
          .then((user) => {
            if (user) {
              request.user = user;
              next();
            } else {
              next(new Error('User Unauthorized'));
            }
          })
          .catch(() => {
            next(new Error('User Unauthorized'));
          });
      }
    } else {
      next(new Error('token Expierd'));
    }
  } catch (err) {
    next(new Error('Unauthorized'));
  }
};

module.exports = socketJwtAuth;
