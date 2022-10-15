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
            doctorId: {
                type: Sequelize.STRING
            },
            clinicId: {
                type: Sequelize.STRING
            },
            specialtyId: {
                type: Sequelize.STRING
            },
            contentHTML: {
                type: Sequelize.STRING
            },
            contentMarkdown: {
                type: Sequelize.STRING
            },
            description: {
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
        await queryInterface.dropTable('Markdown');
    }
};