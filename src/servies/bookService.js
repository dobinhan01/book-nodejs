import db from "../models/index";

let getAllBooks = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let books = await db.Book.findAll();
            resolve({
                errCode: 0,
                message: 'ok',
                data: books
            });
        } catch (e) {
            reject(e)
        }
    })
}

let checkBook = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await db.Book.findOne({
                where: { name: name }
            })
            if (book) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkBook(data.name);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your book is already in used, Plz try another book'
                })
            } else {
                await db.Book.create({
                    name: data.name,
                    author: data.author,
                    publisher: data.publisher,
                    price: data.price,
                    priceNew: data.priceNew,
                    discount: data.discount,
                    categoryId: data.categoryId,
                    image: data.image,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                })
                resolve({
                    errCode: 0,
                    message: 'ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.publisher || !data.price
                || !data.discount || !data.categoryId || !data.contentHTML) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                });
            }
            let book = await db.Book.findOne({
                where: { id: data.id },
                raw: false
            })
            if (book) {
                book.name = data.name;
                book.author = data.author;
                book.publisher = data.publisher;
                book.price = data.price;
                book.priceNew = data.priceNew;
                book.discount = data.discount;
                book.categoryId = data.categoryId;
                book.contentHTML = data.contentHTML;
                book.contentMarkdown = data.contentMarkdown;
                if (data.image) {
                    book.image = data.image;
                }
                await book.save();
                resolve({
                    errCode: 0,
                    message: 'Update book sucessed!'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `Book's not found!`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteBook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    message: "Missing required parameters!"
                })
            }
            let book = await db.Book.findOne({
                where: { id: id }
            })
            if (!book) {
                resolve({
                    errCode: 2,
                    errMessage: `The book isn't exist `
                })
            }
            await db.Book.destroy({
                where: { id: id }
            });

            resolve({
                errCode: 0,
                message: `The book is deleted`
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getFlashSaleHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { Op } = require("sequelize");
            let books = await db.Book.findAll({
                // where: {
                //     discount: {
                //         [Op.or]: ['D5', 'D6']
                //     }
                // },
                limit: limit,
                order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: books
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailBookById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!',
                })
            } else {
                let data = await db.Book.findOne({
                    where: { id: id }
                })

                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getBookByCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!categoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!',
                })
            } else {
                let data = await db.Book.findAll({
                    where: { categoryId: categoryId }
                })

                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllBooks: getAllBooks,
    createNewBook: createNewBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    getFlashSaleHome: getFlashSaleHome,
    getDetailBookById: getDetailBookById,
    getBookByCategory: getBookByCategory
}