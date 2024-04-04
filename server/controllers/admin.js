const status = require('http-status');
const bcrypt = require('bcryptjs');
const { Admins, Sequelize } = require('../models');
const adminResponce = require('../responses').admin.adminAcess;

const { Op } = Sequelize;

const find = (req, res) => {
  const { search, limit, skip, order, orderField } = {
    limit: 15,
    skip: 0,
    order: 'DESC',
    orderField: 'createdAt',
    ...req.query,
  };
  const searchCondition = search
    ? {
        [Op.or]: [
          {
            firstName: { [Op.like]: `%${search}%` },
          },
          {
            lastName: { [Op.like]: `%${search}%` },
          },
          {
            username: { [Op.like]: `%${search}%` },
          },
          {
            email: { [Op.like]: `%${search}%` },
          },
          {
            id: parseInt(search, 10) || parseInt(search.slice(2), 10) || 0,
          },
        ],
      }
    : null;
  Admins.findAndCountAll({
    where: searchCondition,
    order: [[orderField, order]],
    offset: skip,
    limit,
  })
    .then((data) => {
      res.status(status.OK).json({
        success: true,
        count: data.count,
        data: data.rows.map((element) => adminResponce(element)),
      });
    })
    .catch((err) => {
      res
        .status(status.BAD_REQUEST)
        .json({ success: true, message: err.message });
    });
};
const count = (req, res) => {
  const { search } = req.query;
  const searchCondition = search
    ? {
        [Op.or]: [
          {
            firstName: { [Op.like]: `%${search}%` },
          },
          {
            lastName: { [Op.like]: `%${search}%` },
          },
          {
            username: { [Op.like]: `%${search}%` },
          },
          {
            email: { [Op.like]: `%${search}%` },
          },
          {
            id: parseInt(search, 10) || parseInt(search.slice(2), 10) || 0,
          },
        ],
      }
    : null;
  Admins.count({
    where: searchCondition,
  })
    .then((countItem) => {
      res.status(status.OK).json({ success: true, data: countItem });
    })
    .catch((err) => {
      res
        .status(status.BAD_REQUEST)
        .json({ success: true, message: err.message });
    });
};
const findOne = (req, res) => {
  let { id } = req.params;
  if (id.startsWith('AD')) {
    id = parseInt(id.slice(2), 10);
  }
  Admins.findOne({ where: { id } })
    .then((user) => {
      if (user) {
        res.send({ success: true, data: adminResponce(user) });
      } else {
        res
          .status(status.NOT_FOUND)
          .json({ success: false, message: 'not found' });
      }
    })
    .catch(() => {
      res
        .status(status.NOT_FOUND)
        .json({ success: false, message: 'not found' });
    });
};

const findMe = (req, res) => {
  const { user } = req;
  res.send({ success: true, data: adminResponce(user) });
};

const update = async (req, res) => {
  let { id } = req.params;
  const { body } = req;
  if (id.startsWith('AD')) {
    id = parseInt(id.slice(2), 10);
  }
  if (parseInt(id, 10) === parseInt(req.user.id, 10)) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      message: "you can't change your information, go to update your profile",
    });
    return;
  }
  if (body.password) {
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(body.password, salt);
    body.password = encPassword;
  }
  Admins.update(body, { where: { id } })
    .then(() => {
      res.send({ success: true, message: 'updated successfully' });
    })
    .catch(() => {
      res
        .status(status.BAD_REQUEST)
        .json({ success: false, message: 'not found for update' });
    });
};

const updateMe = async (req, res) => {
  const { id } = req.user;
  const { body } = req;
  delete body.status;
  delete body.accessType;

  if (body.password) {
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(body.password, salt);
    body.password = encPassword;
  }

  Admins.update(body, { where: { id } })
    .then(() => {
      res.send({ success: true, message: 'updated successfully' });
    })
    .catch((err) => {
      res
        .status(status.NOT_FOUND)
        .json({ success: false, message: err.message });
    });
};

const create = (req, res) => {
  try {
    const admin = req.body;
    Admins.create(admin)
      .then((data) => {
        res.send({ success: true, data: adminResponce(data) });
      })
      .catch((err) => {
        res.status(status.CONFLICT).send({
          message:
            err.message || 'Some error occurred while creating the Tutorial.',
        });
      });
  } catch (err) {
    res
      .status(status.BAD_REQUEST)
      .json({ success: false, message: 'user not created' });
  }
};
const AdminController = {
  find,
  findOne,
  findMe,
  create,
  count,
  update,
  updateMe,
};
module.exports = AdminController;
