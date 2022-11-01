import { json } from 'express/lib/response';
import db from '../models/index';
import CRUDService from "../services/CRUDService";

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log('-----------------');
        // console.log(data);
        // console.log('-----------------');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }

}

let getAboutPage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('test/about.ejs');
    } catch (error) {
        console.log(error);
    }
}

let getQuestion = (req, res) => {
    return res.render('question.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
    
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    // console.log(req.body);
    return res.send('hello from post crud');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    
    return res.render('displayCRUD.ejs', {
        dataTable:data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        
        return res.render('editCRUD.ejs', {
            user:userData
        });
    }
    else {
        return res.send('User is NOT found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id); 
        return res.send('Delete the user succeed.');
    }
    else {
        return res.send('User is not found.')
    }

    
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getQuestion: getQuestion,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}

// object: {
//     key: '',
//     value: ''
// }