import db from "../models/index";
import bookService from "../servies/bookService";

let postAddBookToCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.bookId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let book = await bookService.getDetailBookById(data.bookId)
                let cart = await db.Cart.findOne({
                    where: {
                        userId: data.userId,
                        bookId: data.bookId
                    },
                    raw: false
                })
                if (!data.quantity) data.quantity = 1;
                if (!cart) {
                    await db.Cart.create({
                        statusId: 'S1',
                        userId: data.userId,
                        bookId: data.bookId,
                        quantity: data.quantity,
                        totalPrice: book.data.priceNew * data.quantity,
                    })
                } else {
                    cart.quantity += data.quantity;
                    cart.totalPrice = book.data.priceNew * cart.quantity;
                    await cart.save();
                }
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

let getAllCartsByUserId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Cart.findAll({
                    where: { userId: id },
                    include: [
                        {
                            model: db.Book
                        }
                    ],
                    raw: true,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateCartByUserId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.bookId || !data.quantity || !data.totalPrice) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let cart = await db.Cart.findOne({
                    where: {
                        userId: data.userId,
                        bookId: data.bookId
                    },
                    raw: false
                })
                if (cart) {
                    cart.userId = data.userId;
                    cart.bookId = data.bookId;
                    cart.quantity = data.quantity;
                    cart.totalPrice = data.totalPrice;

                    await cart.save();
                    resolve({
                        errCode: 0,
                        message: `Update cart sucessed!'`,
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: `Cart's not found!`
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postAddBookToCart, getAllCartsByUserId, updateCartByUserId
}