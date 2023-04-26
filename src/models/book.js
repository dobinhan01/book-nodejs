'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Book.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'categoryData' })
            Book.hasMany(models.Cart, { foreignKey: 'bookId', targetKey: 'id' })
        }
    };
    Book.init({
        name: DataTypes.STRING,
        author: DataTypes.STRING,
        publisher: DataTypes.STRING,
        price: DataTypes.INTEGER,
        priceNew: DataTypes.INTEGER,
        discount: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        image: DataTypes.BLOB('long'),
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Book',
    });
    return Book;
};