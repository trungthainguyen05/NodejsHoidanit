import clinicService from '../services/clinicService';


let createClinic = async (req, res) => {
    try {
        let message = await clinicService.createClinicService(req.body);
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let message = await clinicService.getAllClinicService();
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let id = req.query.id;
        let message = await clinicService.getDetailClinicByIdService(id);
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
}