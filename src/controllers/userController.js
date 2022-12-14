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
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
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
    let userData = req.body;
    let message = await userService.editUser(userData);
    console.log(message);
    return res.status(200).json(message);

}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
}