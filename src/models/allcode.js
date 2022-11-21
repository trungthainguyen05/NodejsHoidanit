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

            Allcode.hasMany(models.Doctor_infors, { foreignKey: 'priceId', as: 'priceTypeData' })
            Allcode.hasMany(models.Doctor_infors, { foreignKey: 'provinceId', as: 'provinceTypeData' })
            Allcode.hasMany(models.Doctor_infors, { foreignKey: 'paymentId', as: 'paymentTypeData' })
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