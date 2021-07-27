const Joi = require("joi");



const testVal = Joi.object({
    zoon_name: Joi.string().required(),
    zoon_no: Joi.number().required(),
    status:Joi.boolean()
});


const update = Joi.object({
    zoon_name: Joi.string().required(),
    zoon_no: Joi.number().required()
});


module.exports = {testVal, update};