'use strict'; 
const { date } = require('joi');
const{
    Model, DataTypes
} = require('sequelize'); 
module.exports = (sequelize, DataTypes) => {
    class hmstaxmaster extends Model{
        /**
         * Helper method for defining associations. 
         * this method is not a part of Sequelize lifecycle
         * the 'model/index' file will call this method automatically
         */
    static associate(model){
        //define association her
    }
}; 
hmstaxmaster.init({ 
    organizationId: DataTypes.INTEGER, 
    groupId: DataTypes.INTEGER, 
    businessId: DataTypes.INTEGER, 
    taxType: DataTypes.STRING, 
    taxCategory: DataTypes.INTEGER, 
    description: DataTypes.STRING, 
    fromDate: DataTypes.STRING, 
    tillDate: DataTypes.STRING, 
    taxDescription: DataTypes.STRING,
    taxPercentage: DataTypes.INTEGER, 
    effectiveFromDate: DataTypes.STRING,
    effectiveToDate: DataTypes.STRING, 
    serialNo: DataTypes.INTEGER, 
    userId: DataTypes.INTEGER, 
    formName: DataTypes.STRING, 
    terminalId: DataTypes.STRING, 
    isActive: DataTypes.INTEGER, 
    isDeleted: DataTypes.INTEGER 
},{
    sequelize, 
    modelName: 'hmstaxmaster', 
}); 
return hmstaxmaster; 
}; 