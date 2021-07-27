'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class hmsStoreMaster extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    hmsStoreMaster.init({
     
        organizationId: DataTypes.INTEGER,
        groupId: DataTypes.INTEGER,
        businessId: DataTypes.INTEGER,
        storecode: DataTypes.STRING,
        terminalId: DataTypes.STRING,
        formName: DataTypes.STRING,
        storeDiscription: DataTypes.STRING,
        costCenterCode: DataTypes.STRING,
        storeIdentifierId: DataTypes.STRING,
        approvLimit: DataTypes.INTEGER,
        specialityDiscription: DataTypes.STRING,
        isActive: DataTypes.INTEGER,
        isDeleted: DataTypes.INTEGER,
        storetype: DataTypes.STRING,
        userId: DataTypes.STRING,
        allowPOGRN: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'hmsstoremaster',
    });
    return hmsStoreMaster;
};