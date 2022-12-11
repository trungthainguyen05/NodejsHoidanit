import res from 'express/lib/response';
import doctorService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) { limit = 10 };
    try {
        let res1 = await doctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(res1);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);

    } catch (e) {
        console.log('Error from Server: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let data = req.body;
        let message = await doctorService.saveDetailInforDoctor(data);
        return res.status(200).json(message);

    } catch (e) {
        console.log('postInforDoctor: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let id = req.query.id;
        let response = await doctorService.getDetailDoctorByIdService(id);
        return res.status(200).json(response)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let data = req.body;
        let message = await doctorService.bulkCreateScheduleService(data);
        return (res.status(200).json(message));

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        // console.log('tr check data: ', req.query.doctorId, req.query.date)
        let message = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date);
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let message = await doctorService.getExtraInforDoctorByIdService(req.query.doctorId);
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let message = await doctorService.getProfileDoctorByIdService(req.query.doctorId);
        return (res.status(200).json(message));
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {
        let message = await doctorService.getListPatientForDoctorService(req.query.doctorId, req.query.date);
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
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
}