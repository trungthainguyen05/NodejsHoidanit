import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {

        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //check password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        // console.log(user);
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User is not found";
                }
                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email is not exist.";
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check exist email
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email already exist. Please try with annother email!'
                });
            }

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resolve({
                errCode: 0,
                message: 'OK'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: { id: userId }
            })
            // console.log(users);

            if (!users) {
                resolve({
                    errCode: 2,
                    message: 'The userId is not exist'
                });
            }

            await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })

        } catch (e) {
            reject(e);
        }
    })
}

let editUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userId = userData.id;
            if (!userId) {
                resolve({
                    errCode: 1,
                    message: "missing required parameter Id"
                })
            }

            let user = await db.User.findOne({
                where: { id: userId },
                raw: false
            })
            if (user) {
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.address = userData.address;

                await user.save();
                resolve({
                    errCode: 0,
                    message: "Update is success!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "user is not found."
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
}