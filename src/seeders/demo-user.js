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
            password: '123456',
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