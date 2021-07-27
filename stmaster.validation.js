const Joi = require('joi');
const { join } = require('lodash');
const obj = Joi.object({
    storeDiscription: Joi.number().required(),
    costCenterCode: Joi.number().required(),
    storeIdentifierId: Joi.number().required(),
    approvLimit: Joi.number().required(),
    specialityDiscription: Joi.number().required(),
    allowPOGRN: Joi.number().required(),
    isActive: Joi.number().required()
});
const storeMasterCreate = Joi.object().keys({
    organizationId:Joi.number().required(), 
    groupId: Joi.number().required(), 
    businessId: Joi.number().required(),
    storetype: Joi.number().required(),
    userId: Joi.number().required(),
    formName: Joi.string().required(),
    terminalId: Joi.string().required(),
    children:Joi.array().items(obj)
});
const newobj = Joi.object({
    storeDiscription: Joi.number().required(),
    costCenterCode: Joi.number().required(),
    storeIdentifierId: Joi.number().required(),
    approvLimit: Joi.number().required(),
    specialityDiscription: Joi.number().required(),
    allowPOGRN: Joi.number().required(),
    isActive: Joi.number().required()
});

const updateStore = Joi.object({
    storeId:Joi.number().required(),
    organizationId:Joi.number().required(), 
    groupId: Joi.number().required(), 
    businessId: Joi.number().required(),
    storetype: Joi.number().required(),
    userId: Joi.number().required(),
    formName: Joi.string().required(),
    terminalId: Joi.string().required(),
    children:Joi.array().items(newobj)
})
const detailStore=Joi.object({
    page:Joi.number().required()
})


module.exports = { storeMasterCreate, updateStore,detailStore}