'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserInfo, { foreignKey: 'userId' });
      User.belongsToMany(models.Product, { through: 'Wishlist', foreignKey: 'userId', otherKey: 'productId' });
      User.hasMany(models.Review, { foreignKey: 'userId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};