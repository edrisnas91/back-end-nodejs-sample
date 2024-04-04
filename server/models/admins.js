const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { adminAccessTypes, adminStatusTypes } = require('../enum');

module.exports = (sequelize, DataTypes) => {
  class admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  admins.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      accessType: DataTypes.ENUM(Object.values(adminAccessTypes)),
      status: DataTypes.ENUM(Object.values(adminStatusTypes)),
    },
    {
      sequelize,
      modelName: 'admins',
    }
  );
  admins.beforeCreate(async (user) => {
    const newData = user;
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(user.password, salt);
    newData.password = encPassword;
  });
  // admins.beforeUpdate(async (record, options) => {
  //   console.log('pre update', record, options)
  //   if(record.dataValues.password) {
  //     const salt = await bcrypt.genSalt(10);
  //     const encPassword = await bcrypt.hash(record.dataValues.password,salt);
  //     record.dataValues.password = encPassword;
  //   }
  // });
  return admins;
};
