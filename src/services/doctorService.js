import db from '../models/index';
require('dotenv').config();
import _, { reject } from 'lodash';
import schedule from '../models/schedule';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

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
            console.log('tr check inputData: ', inputData);
            if (!inputData.contentMarkdown || !inputData.contentHTML
                || !inputData.doctorId || !inputData.description
                || !inputData.action || !inputData.selectedPrice
                || !inputData.selectedPayment || !inputData.selectedProvince
                || !inputData.nameClinic || !inputData.addressClinic
                || !inputData.note
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            }

            else {
                //update & insert to Markdown
                if (inputData.action === "CREATE") {
                    await db.Markdowns.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    })
                } else if (inputData.action === "EDIT") {
                    let doctorMarkdown = await db.Markdowns.findOne({
                        where: {
                            doctorId: inputData.doctorId
                        },
                        raw: false,
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.updateAt = new Date();

                        await doctorMarkdown.save();
                    }
                }

                //update & insert to doctor_infor
                let doctorInfor = await db.Doctor_infors.findOne({
                    where: {
                        doctorId: inputData.doctorId,
                    },
                    raw: false
                })

                // !inputData.selectedPrice
                // || !inputData.selectedPayment || !inputData.selectedProvince
                // || !inputData.nameClinic || !inputData.addressClinic
                // || !inputData.note

                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId;
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.note = inputData.note;
                    await doctorInfor.save();
                }
                else {
                    //create
                    await db.Doctor_infors.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        addressClinic: inputData.addressClinic,
                        nameClinic: inputData.nameClinic,
                        note: inputData.note,
                    })
                }

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

let getDetailDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parametter'
                })
            }
            else {
                let doctorDetail = await db.Users.findOne({
                    where: {
                        id: inputId
                    }, attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdowns,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {
                            model: db.Doctor_infors,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
                        { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })

                if (doctorDetail && doctorDetail.image) {
                    doctorDetail.image = new Buffer(doctorDetail.image, 'base64').toString('binary');
                }

                if (!doctorDetail) data = {}

                resolve({
                    errCode: 0,
                    data: doctorDetail
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                    })
                }

                //Get all exsiting data
                let existing = await db.Schedules.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'timeType', 'maxNumber'],
                    raw: true
                })

                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                })

                //create different data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedules.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}

let getScheduleByDateService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            } else {
                let dataSchedule = await db.Schedules.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcodes, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })

                if (!dataSchedule) { dataSchedule = [] }

                resolve({
                    errCode: 0,
                    data: dataSchedule
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getExtraInforDoctorByIdService = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Doctor_infors.findOne({
                    where: {
                        doctorId: idInput
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getProfileDoctorByIdService = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Users.findOne({
                    where: {
                        id: idInput
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdowns,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_infors,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {}

                resolve({
                    errCode: 0,
                    data: data
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
    getDetailDoctorByIdService: getDetailDoctorByIdService,
    bulkCreateScheduleService: bulkCreateScheduleService,
    getScheduleByDateService: getScheduleByDateService,
    getExtraInforDoctorByIdService: getExtraInforDoctorByIdService,
    getProfileDoctorByIdService: getProfileDoctorByIdService,

}