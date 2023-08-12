'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInfo.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' })
    }
  };
  UserInfo.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    img: DataTypes.BLOB('long'),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserInfo',
  });
  return UserInfo;
};