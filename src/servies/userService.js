import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);
let hashPassword = (password) => bcrypt.hashSync(password, salt);

let getCurrentUserService = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.findOne({
                where: { email },
                raw: true,
                attributes: {
                    exclude: ['password']
                }
            })
            resolve({
                errCode: response ? 0 : 1,
                message: response ? 'ok' : 'Failed to get a user',
                data: response
            })

        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = [];
            let per_page = 6;
            let total = await db.User.count();
            let total_pages = total % per_page === 0 ? total / per_page : Math.floor(total / per_page) + 1;
            if (!page) {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } else {
                const skip = (page - 1) * per_page;
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    limit: per_page,
                    offset: skip
                })
            }

            resolve({
                errCode: 0,
                message: 'ok',
                page: +page,
                per_page,
                total,
                total_pages,
                data: users
            });
        } catch (e) {
            reject(e)
        }
    })
}

let postCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUserEmail = await db.User.findOne({ where: { email: data.email } });
            if (checkUserEmail) {
                resolve({
                    errCode: 2,
                    message: 'Your email is already in used, Plz try another email'
                })
            } else {
                let hashPasswordFromBcrypt = await hashPassword(data.password);
                let user = await db.User.create({
                    name: data.name,
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    roleId: 'R2',
                })
                resolve({
                    errCode: 0,
                    message: 'ok',
                    data: user
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let putEditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.name = data.name;
                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update user sucessed!',
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `User's not found!`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id } })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist `
                })
            }
            await db.User.destroy({ where: { id } });
            resolve({
                errCode: 0,
                message: `The user is deleted`
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getCurrentUserService,
    getAllUsers: getAllUsers,
    postCreateUser,
    putEditUser,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService,
}