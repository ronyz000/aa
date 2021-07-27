const Joi = require("@hapi/joi"); 

let temp = Joi.object({
    taxCategory: Joi.number().required(), 
    taxDescription: Joi.string().required(), 
    effectiveFromDate: Joi.string().required(), 
    effectiveToDate: Joi.string().required(),
    taxPercentage:Joi.number().required(),
    isActive: Joi.number().required()
})

let create = Joi.object({
    organizationId: Joi.number().required(), 
    groupId: Joi.number().required(), 
    businessId: Joi.number().required(), 
    taxType: Joi.number().required(), 
    formName: Joi.string().required(), 
    terminalId: Joi.string().required(),
    children: Joi.array().items(temp)
})
let update = Joi.object({
    taxId:Joi.number().required(),
    organizationId: Joi.number().required(), 
    groupId: Joi.number().required(), 
    businessId: Joi.number().required(), 
    taxType: Joi.number().required(), 
    formName: Joi.string().required(), 
    terminalId: Joi.string().required(),
    children: Joi.array().items(temp)
})

module.exports = {create,update}