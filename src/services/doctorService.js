import db from '../models/index';

let getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.Users.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                },
                raw: true,
            })

            resolve({
                errCode: 0,
                data: doctors
            })

        } catch (e) {
            reject(e);
        }
    })
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('tr check inputdata from doctorService: ', inputData);
            if (!inputData.contentMarkdown || !inputData.contentHTML
                || !inputData.doctorId || !inputData.description) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            }
            else {
                await db.Markdowns.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                })
                resolve({
                    errCode: 0,
                    errMessage: "save infor doctor succeed!",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
}