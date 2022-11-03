'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Markdown', {
            // doctorId: DataTypes.STRING,
            // clinicId: DataTypes.STRING,
            // specialtyId: DataTypes.STRING,
            // contentHTML: DataTypes.STRING,
            // contentMarkdown: DataTypes.STRING,
            // description: DataTypes.STRING,

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            description: {
                type: Sequelize.TEXT('long')
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            specialtyId: {
                type: Sequelize.INTEGER
            },
            clinicId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Markdown');
    }
};