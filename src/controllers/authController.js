import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);
let hashPassword = (password) => bcrypt.hashSync(password, salt);


const register = async (req, res) => {
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
                message: 'Username or email already exists',
            })
        }
        const user = await db.User.create({
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

let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        const user = await db.User.findOne({ where: { email } })
        if (!user) {
            return res.status(200).json({
                errCode: 2,
                message: `User's not found`
            })
        }
        const checkPassword = await bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(200).json({
                errCode: 3,
                message: 'Wrong password'
            })
        }
        let token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '2d' });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            token
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }

}

let loginAdmin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        const user = await db.User.findOne({ where: { email } })
        if (!user) {
            return res.status(200).json({
                errCode: 2,
                message: `User's not found`
            })
        }
        const checkPassword = await bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(200).json({
                errCode: 3,
                message: 'Wrong password'
            })
        }
        if (user.isAdmin === 0) {
            return res.status(200).json({
                errCode: 4,
                message: 'You do not have permission to login admin'
            })
        }
        let token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '2d' });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            token
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }

}

module.exports = {
    register, login, loginAdmin
}