'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Markdown.init({

        doctorId: DataTypes.STRING,
        clinicId: DataTypes.STRING,
        specialtyId: DataTypes.STRING,
        contentHTML: DataTypes.STRING,
        contentMarkdown: DataTypes.STRING,
        description: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};