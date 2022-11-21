import db from '../models/index';
require('dotenv').config();

let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                //update, create patient
                let user = await db.Users.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                });

                // create a booking record
                if (user && user[0]) {
                    let bk = await db.Bookings.findOne({
                        where: {
                            patientId: user[0].id
                        },
                        raw: false
                    })

                    if (bk) {
                        //update
                        bk.statusId = 'S1';
                        bk.doctorId = data.doctorId;
                        bk.patientId = user[0].id;
                        bk.date = data.date;
                        bk.timeType = data.timeType;
                        await bk.save();
                    } else {
                        //create
                        await db.Bookings.create({
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        })
                    }

                    // await db.Bookings.findOrCreate({
                    //     where: { patientId: user[0].id },
                    //     defaults: {
                    //         statusId: 'S1',
                    //         doctorId: data.doctorId,
                    //         patientId: user[0].id,
                    //         date: data.date,
                    //         timeType: data.timeType,
                    //     }
                    // })

                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointmentService: postBookAppointmentService,
}