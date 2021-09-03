const Joi = require('joi') 

function validateRegistratrion(body){
    const userSchema = Joi.object({
        name:
        Joi.string()
            .required()
            .min(5),
        password: 
        Joi.string()
            .min(5)
            .required(),

        email: 
        Joi.string()
            .min(5)
            .required()
            .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i),
    })

    return userSchema.validate({...body});
}

function validateLogging(body){
    const userSchema = Joi.object({
        password: 
        Joi.string()
            .min(5)
            .required(),

        email: 
        Joi.string()
            .min(5)
            .required()
            .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i),
    })

    return userSchema.validate({...body});
}

module.exports.validateLogin = validateLogging
module.exports.validateRegistration = validateRegistratrion