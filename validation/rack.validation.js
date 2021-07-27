const Joi = require("joi");



const testVal = Joi.object({
    rack_name: Joi.string().required(),
    rack_no: Joi.number().required(),
    status:Joi.boolean()
});


const update = Joi.object({
    rack_name: Joi.string().required(),
    rack_no: Joi.number().required()
});


module.exports = {testVal, update};