'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bookings', {
            // statusId: DataTypes.STRING,
            // doctorId: DataTypes.STRING,
            // patientId: DataTypes.STRING,
            // date: DataTypes.DATE,
            // timeType: DataTypes.STRING,

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            statusId: {
                type: Sequelize.STRING
            },
            doctorId: {
                type: Sequelize.STRING
            },
            patientId: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            token: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Bookings');
    }
};