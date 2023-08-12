'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    Blog.init({
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        date: DataTypes.STRING,
        tag: DataTypes.STRING,
        img: DataTypes.BLOB('long'),
        excerpt: DataTypes.TEXT('long'),
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};