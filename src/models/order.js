'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
            Order.belongsToMany(models.Product, { through: 'OrderDetail', foreignKey: 'orderId', otherKey: 'productId' });
        }
    };
    Order.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        note: DataTypes.TEXT,
        date: DataTypes.STRING,
        total: DataTypes.FLOAT,
        payment: DataTypes.STRING,
        status: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};