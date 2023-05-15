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
        let response = await userService.createUser(req.body);
        return res.status(200).json(response);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let handleEditUser = async (req, res) => {
    let message = await userService.updateUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
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
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}