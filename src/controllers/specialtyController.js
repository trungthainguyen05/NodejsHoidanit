import specialtyService from '../services/specialtyService';


let createSpecialty = async (req, res) => {
    try {
        let message = await specialtyService.createSpecialtyService(req.body);
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let message = await specialtyService.getAllSpecialtyService();
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let id = req.query.id;
        let location = req.query.location;
        let message = await specialtyService.getDetailSpecialtyByIdService(id, location);
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}




module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
}