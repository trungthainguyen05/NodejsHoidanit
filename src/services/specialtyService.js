const db = require("../models")

let createSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML
                || !data.descriptionMarkdown || !data.imageBase64
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialties.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
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

let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialties.findAll({
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
                errMessage: 'Find all Specialty',
                data: data,
            })

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialtyService: createSpecialtyService,
    getAllSpecialtyService: getAllSpecialtyService,
}