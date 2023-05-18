import userService from "../servies/userService";

let getCurrentUser = async (req, res) => {
    let email = req.user.email;
    try {
        let response = await userService.getCurrentUserService(email);
        return res.status(200).json(response);

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
        const page = req.query.page;
        let response = await userService.getAllUsers(page);
        return res.status(200).json(response);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }

}

let postCreateUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters!',
            })
        }
        let response = await userService.postCreateUser(req.body);
        return res.status(200).json(response);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let putEditUser = async (req, res) => {
    try {
        let { id, name } = req.body;
        if (!id || !name) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters!',
            })
        }
        let response = await userService.putEditUser(req.body);
        return res.status(200).json(response);

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
        let { id } = req.query;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters!',
            })
        }
        let response = await userService.deleteUser(req.query.id);
        return res.status(200).json(response);

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
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('get all code', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getCurrentUser,
    getAllUsers, postCreateUser,
    putEditUser, deleteUser,
    getAllCode: getAllCode,
}