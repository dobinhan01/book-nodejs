'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING
            },
            desc: {
                type: Sequelize.TEXT
            },
            img: {
                type: Sequelize.BLOB('long')
            },
            author: {
                type: Sequelize.STRING
            },
            oldPrice: {
                type: Sequelize.FLOAT
            },
            price: {
                type: Sequelize.FLOAT
            },
            discount: {
                type: Sequelize.STRING
            },
            stars: {
                type: Sequelize.FLOAT
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            quantityStock: {
                type: Sequelize.INTEGER
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            publisherId: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
    }
};