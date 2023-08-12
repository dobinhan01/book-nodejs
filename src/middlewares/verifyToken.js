import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(200).json({
            errCode: 1,
            message: 'You are not authenticated!'
        })
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(200).json({
                errCode: 3,
                message: 'Token is not valid',
            })
        }
        req.user = user;
        next();
    })
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'You are not allowed to do that!',
            })
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'You are not allowed to do that!',
            })
        }
    })
}

module.exports = {
    verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin
}