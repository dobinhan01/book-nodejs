import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
let hashPassword = (password) => bcrypt.hashSync(password, salt);

let getCurrentUser = async (req, res) => {
    try {
        let { id } = req.user;
        let user = await db.User.findOne({
            where: { id },
            attributes: {
                exclude: ['password']
            }
        })
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: user
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getAllUsers = async (req, res) => {
    try {
        let users = await db.User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: users
        })

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }

}

let createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        const isCheckUser = await db.User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });
        if (isCheckUser) {
            return res.status(200).json({
                errCode: 2,
                message: 'Your username or email is already in used, Plz try another email'
            })
        }
        let user = await db.User.create({
            username,
            email,
            password: hashPassword(password)
        })
        await db.UserInfo.create({
            username,
            email,
            userId: user.id
        })
        return res.status(200).json({
            errCode: 0,
            message: 'ok'
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let editUser = async (req, res) => {
    try {
        let { id } = req.params;
        let { isAdmin } = req.body;
        if (!id || !isAdmin) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let user = await db.User.findOne({ where: { id }, raw: false })
        if (!user) {
            return res.status(200).json({
                errCode: 2,
                message: `User's not found`
            })
        }
        user.isAdmin = isAdmin;
        await user.save();
        return res.status(200).json({
            errCode: 0,
            message: 'ok'
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let user = await db.User.findOne({ where: { id } })
        if (!user) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The user isn't exist `
            })
        }
        await db.User.destroy({ where: { id } });
        await db.UserInfo.destroy({ where: { userId: id } });
        return res.status(200).json({
            errCode: 0,
            message: 'ok'
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getAllCode = async (req, res) => {
    try {
        let { type } = req.query;
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let allcode = await db.Allcode.findAll({ where: { type } });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: allcode
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getUserInfo = async (req, res) => {
    try {
        let { id } = req.query;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let user = await db.UserInfo.findOne({ where: { id } });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: user
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let editUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, address, img } = req.body;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        const user = await db.UserInfo.findOne({ where: { id }, raw: false });
        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.address = address;
        user.img = img;
        await user.save()
        return res.status(200).json({
            errCode: 0,
            message: 'ok'
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAmountDashboard = async (req, res) => {
    try {
        const amountProduct = await db.Product.count();
        const amountAccount = await db.User.count();
        const amountOrder = await db.Order.count();

        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: { amountProduct, amountAccount, amountOrder }
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getCurrentUser, getAllUsers, createUser, editUser, deleteUser, getAllCode,
    getUserInfo, editUserInfo, getAmountDashboard
}