const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { Admins, Clients } = require('../models');
const config = require('../config/config');
const { adminAccessTypes, adminStatusTypes } = require('../enum');
require('dotenv').config();
// const socket = io.connect('', {
//   extraHeaders: {
//       Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAxIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MDQ0NDQ0fQ.aWj5grFWJwcsbgxNJ7HdfL5PUfD8fMh9GwXutuR86GE",
//   },
// });

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const strategyAdminUser = new JwtStrategy(opts, (payload, done) =>
  Admins.findOne({
    where: { id: payload.me },
  })
    .then((user) => {
      if (
        user &&
        user.dataValues.accessType === adminAccessTypes.ADMIN &&
        user.dataValues.status === adminStatusTypes.ACTIVE &&
        payload.type !== 'client'
      ) {
        return done(null, user);
      }
      return done(null, false);
      // or you could create a new account
    })
    .catch(() => done(null, false))
);

const strategyAdminOrOperatorUser = new JwtStrategy(opts, (payload, done) =>
  Admins.findOne({
    where: { id: payload.me },
  })
    .then((user) => {
      if (
        payload.type !== 'client' &&
        user &&
        user.dataValues.status === adminStatusTypes.ACTIVE
      ) {
        return done(null, user);
      }
      return done(null, false);
      // or you could create a new account
    })
    .catch(() => done(null, false))
);


module.exports = (passport) => {
  passport.use('adminUser', strategyAdminUser);
  passport.use('adminOrOperatorUser', strategyAdminOrOperatorUser);
};
