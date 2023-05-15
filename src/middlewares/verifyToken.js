import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

    const accessToken = req.headers.token?.split(' ')[1];
    if (!accessToken) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "You're not authenticated!",
        })
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Token is not valid',
            })
        }
        req.user = user;
        next();
    })
}

const veverifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'R1') {
            next();
        } else {
            return res.status(200).json({
                errCode: 1,
                errMessage: `You're not allowed login`,
            })
        }
    })
}

module.exports = {
    verifyToken, veverifyTokenAndAdmin
}