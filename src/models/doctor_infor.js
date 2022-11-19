'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctor_infor.belongsTo(models.Users, { foreignKey: 'doctorId' })

            Doctor_infor.belongsTo(models.Allcodes, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' })
            Doctor_infor.belongsTo(models.Allcodes, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' })
            Doctor_infor.belongsTo(models.Allcodes, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' })

        }
    };
    Doctor_infor.init({
        // id: DataTypes.INTEGER,
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,



    }, {
        sequelize,
        modelName: 'Doctor_infors',
    });
    return Doctor_infor;
};