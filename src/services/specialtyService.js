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

module.exports = {
    createSpecialtyService: createSpecialtyService,
}