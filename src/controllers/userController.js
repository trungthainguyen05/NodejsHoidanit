import res from 'express/lib/response';
import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }
    //check email exist
    //compare password: 1. pass dung form. 2. pass co dung trong database
    //return userInfor
    //access_token:JWT json web token
    //19:35

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing Required Parameter",
            users: []
        })
    }

    let users = await userService.getAllUsers(id);
    // console.log(users);

    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    try {
        let message = await userService.createNewUser(req.body);
        console.log(message);
        return res.status(200).json(message);
    } catch (e) {
        console.log('Create new user error: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "missing required parameter"
        })
    }
    console.log('delete id: ', id);
    let message = await userService.deleteUser(id);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    try {
        let data = req.body;
        let message = await userService.editUser(data);
        console.log(message);
        return res.status(200).json(message);

    } catch (e) {
        console.log('Edit user error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode: getAllCode,
}