'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        return queryInterface.bulkInsert('Users', [{
            email: 'trung@gmail.com',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung',
            lastName: 'Nguyen',
            address: 'Dong Nai',
            gender: true, //True: male, False: female
            roleId: 'R1',
            phonenumber: '09314962322',
            positionId: 'P0',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor1',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung1',
            lastName: 'Nguyen1',
            address: 'Dong Nai1',
            gender: false, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P0',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor2',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung2',
            lastName: 'Nguyen2',
            address: 'Dong Nai2',
            gender: true, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor3',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung3',
            lastName: 'Nguyen3',
            address: 'Dong Nai3',
            gender: false, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P2',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor4',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung4',
            lastName: 'Nguyen4',
            address: 'Dong Nai4',
            gender: false, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P3',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor5',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung5',
            lastName: 'Nguyen5',
            address: 'Dong Nai5',
            gender: false, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P4',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor6',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung6',
            lastName: 'Nguyen6',
            address: 'Dong Nai6',
            gender: true, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P0',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor7',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung7',
            lastName: 'Nguyen7',
            address: 'Dong Nai7',
            gender: true, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'doctor8',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung8',
            lastName: 'Nguyen8',
            address: 'Dong Nai8',
            gender: true, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P2',
            createdAt: new Date(),
            updatedAt: new Date()
        }
            ,
        {
            email: 'doctor9',
            password: '$2a$10$ZGZnVVP9q43A5aOwclxqYu1SgFBx1D5aXY3armXYyG6iFg.PVEqpm',
            firstName: 'Trung9',
            lastName: 'Nguyen9',
            address: 'Dong Nai9',
            gender: true, //True: male, False: female
            roleId: 'R2',
            phonenumber: '09314962322',
            positionId: 'P3',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ]
        );


    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('Users', null, {});
    }
};