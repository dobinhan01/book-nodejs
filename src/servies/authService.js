import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);
let hashPassword = (password) => bcrypt.hashSync(password, salt);

let registerService = (name, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isCheckEmail = await db.User.findOne({ where: { email } })
            const isCheckName = await db.User.findOne({ where: { name } })

            if (isCheckEmail || isCheckName) {
                resolve({
                    errCode: 2,
                    message: 'The name or email is existed!'
                })
            } else {
                let response = await db.User.create({
                    name,
                    email,
                    password: hashPassword(password)
                })
                resolve({
                    errCode: 0,
                    message: 'ok',
                    data: response
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let generateAccessToken = (user) => {
    return jwt.sign(
        { name: user.name, email: user.email, role: user.roleId },
        process.env.SECRET_KEY,
        { expiresIn: '2d' }
    )
}

let generateRefreshToken = (user) => {
    return jwt.sign(
        { name: user.name, email: user.email, role: user.roleId },
        process.env.REFRESH_KEY,
        { expiresIn: '365d' }
    )
}

let loginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email },
                raw: true
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    message: `User's not found!`
                })
            } else {
                const checkPassword = await bcrypt.compareSync(password, user.password);
                if (!checkPassword) {
                    resolve({
                        errCode: 3,
                        message: 'Wrong password'
                    })
                } else {
                    let token = generateAccessToken(user);
                    // let refreshToken = generateRefreshToken(user);
                    // const { password, ...others } = user
                    resolve({
                        errCode: 0,
                        message: 'ok',
                        token,
                        // refreshToken
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let requestRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
                if (err) {
                    console.log(err)
                }
                const newAccessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user);
                resolve({
                    errCode: 0,
                    message: 'ok',
                    token: newAccessToken,
                    newRefreshToken
                })
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    registerService, loginService, requestRefreshToken
}