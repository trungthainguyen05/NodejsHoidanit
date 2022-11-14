'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.Users, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.Users, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.Schedules, { foreignKey: 'timeType', as: 'timeTypeData' })
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Allcodes',
    });
    return Allcode;
};