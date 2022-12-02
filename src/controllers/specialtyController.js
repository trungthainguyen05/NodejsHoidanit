import specialtyService from "../services/specialtyService";


let createSpecialty = async (req, res) => {
    try {
        let message = await specialtyService.createSpecialtyService(req.query.doctorId);
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
}