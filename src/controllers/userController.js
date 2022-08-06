import userService from '../services/userService';

let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message:'Missing inputs parameter'
        })
    }
    //check email exist
    //compare password: 1. pass dung form. 2. pass co dung trong database
    //return userInfor
    //access_token:JWT json web token
    //19:35

    let userData = await userService.handleUserLogin(email,password);
    

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin
}