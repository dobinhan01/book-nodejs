'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book_Author extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Book_Author.init({
        bookId: DataTypes.STRING,
        authorId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Book_Author',
    });
    return Book_Author;
};