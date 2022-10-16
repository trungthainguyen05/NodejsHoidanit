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
        }]);
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