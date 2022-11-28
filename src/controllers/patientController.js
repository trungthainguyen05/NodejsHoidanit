import res from 'express/lib/response';
import patientService from '../services/patientService';



let postBookAppointment = async (req, res) => {
    try {
        let data = req.body;
        let message = await patientService.postBookAppointmentService(data);
        return (res.status(200).json(message));

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let data = req.body;
        let message = await patientService.postVerifyBookAppointmentService(data);
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
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
}