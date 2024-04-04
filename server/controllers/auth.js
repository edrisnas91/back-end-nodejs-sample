const status = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('../middlewares/JWT');
const { Admins, Clients } = require('../models');
const adminResponce = require('../responses').auth.adminAcess;
const clientResponce = require('../responses').auth.clientAcess;

const loginAdmin = (req, res) => {
  const data = req.body;
  Admins.findOne({
    where: { username: data.username },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(data.password, user.password, (err, result) => {
          if (err || !result) {
            res.status(status.UNAUTHORIZED).json({
              success: false,
              message: 'username or password not correct1',
            });
          } else {
            const jwtToken = jwt.issue(user.dataValues);
            res.status(status.CREATED).json({
              success: true,
              data: adminResponce({
                ...user.dataValues,
                token: jwtToken.tocken,
              }),
            });
          }
        });
      } else {
        res.status(status.UNAUTHORIZED).json({
          success: false,
          message: 'username or password not correct',
        });
      }
    })
    .catch(() => {
      res
        .status(status.UNAUTHORIZED)
        .json({ success: false, message: 'username or password not correct' });
    });
};

const verifyCode = (req, res) => {
  try {
    // console.log(req);
    const { redisClient } = req.app.locals;
    const { phone } = req.body;
    redisClient.set(`phone:${phone}`, 2024, 'EX', 180);
    res
      .status(status.CREATED)
      .json({ success: true, message: 'verification code has sent.' });
  } catch (err) {
    res
      .status(status.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

const loginClient = (req, res) => {
  try {
    const { body } = req;
    const { redisClient } = req.app.locals;
    redisClient
      .get(`phone:${body.phone}`)
      .then((code) => {
        console.log(code);
        if (parseInt(code, 10) !== parseInt(body.verifyCode, 10)) {
          throw new Error('verification code is not valid.');
        }
        Clients.findOrCreate({
          where: { phone: body.phone },
        })
          .then((data) => {
            const user = data[0];
            console.log(user);
            if (user) {
              const jwtToken = jwt.issue(user.dataValues);
              res.status(status.CREATED).json({
                success: true,
                data: clientResponce({
                  ...user.dataValues,
                  token: jwtToken.tocken,
                }),
              });
            } else {
              res
                .status(status.UNAUTHORIZED)
                .json({ success: false, message: 'client not correct' });
            }
          })
          .catch((err) => {
            console.log(err);
            res
              .status(status.UNAUTHORIZED)
              .json({ success: false, message: 'data not valid' });
          });
      })
      .catch((err) => {
        res
          .status(status.UNAUTHORIZED)
          .json({ success: false, message: err.message || 'data not valid' });
      });
  } catch (err) {
    res
      .status(status.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

const Auth = {
  loginAdmin,
  verifyCode,
  loginClient,
};
module.exports = Auth;
