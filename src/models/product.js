'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id' });
            Product.belongsTo(models.Publisher, { foreignKey: 'publisherId', targetKey: 'id' });
            Product.belongsToMany(models.User, { through: 'Wishlist', foreignKey: 'productId', otherKey: 'userId' });
            Product.belongsToMany(models.Order, { through: 'OrderDetail', foreignKey: 'productId', otherKey: 'orderId' });
            Product.hasMany(models.Review, { foreignKey: 'productId' });
        }
    };
    Product.init({
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        desc: DataTypes.TEXT,
        img: DataTypes.BLOB('long'),
        author: DataTypes.STRING,
        oldPrice: DataTypes.FLOAT,
        price: DataTypes.FLOAT,
        discount: DataTypes.STRING,
        stars: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER,
        quantityStock: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        publisherId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};