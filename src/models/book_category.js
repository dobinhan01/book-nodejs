'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book_Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Book_Category.init({
        bookId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Book_Category',
    });
    return Book_Category;
};