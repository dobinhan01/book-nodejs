import authService from "../servies/authService";
let register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters!',
            })
        }
        let response = await authService.registerService(name, email, password);
        return res.status(200).json(response);

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
        let response = await authService.loginService(email, password);
        // let { refreshToken, ...others } = response;
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     path: '/',
        //     samSite: 'strict'
        // })
        return res.status(200).json(response);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }

}

let requestRefreshToken = async (req, res) => {
    try {
        let refreshToken = req.cookie.refreshToken;
        if (!refreshToken) {
            return res.status(200).json({
                errCode: 1,
                errMessage: `You're not authenticated!`,
            })
        }
        let response = await authService.requestRefreshToken(refreshToken);
        let { newRefreshToken, ...others } = response;
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            samSite: 'strict'
        })
        return res.status(200).json({ ...others });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

module.exports = {
    register, login, requestRefreshToken
}