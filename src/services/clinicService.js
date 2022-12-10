const db = require("../models")

let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML
                || !data.descriptionMarkdown || !data.imageBase64
                || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinics.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create specialty succeed',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinics.findAll({
                // attributes: {
                //     exclude: ['image']
                // }
            });

            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'Find all Clinic',
                data: data,
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClinicByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            }
            else {
                let data = {};
                data = await db.Clinics.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_infors.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })
                    data.doctorClinic = doctorClinic;
                }
                else {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Get detail specialty by id suscess',
                    data: data,
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createClinicService: createClinicService,
    getAllClinicService: getAllClinicService,
    getDetailClinicByIdService: getDetailClinicByIdService,
}