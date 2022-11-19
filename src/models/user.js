'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Allcodes, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
            User.belongsTo(models.Allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
            User.hasOne(models.Markdowns, { foreignKey: 'doctorId' })
            User.hasOne(models.Doctor_infors, { foreignKey: 'doctorId' })
        }
    };
    User.init({
        // id: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        roleId: DataTypes.STRING,
        image: DataTypes.BLOB,
        phonenumber: DataTypes.STRING,
        positionId: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Users',
    });
    return User;
};