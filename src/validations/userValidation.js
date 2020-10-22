import Joi from "joi"
export const validateUser = Joi.object().keys({
    firstName: Joi.string().min(2).max(40).required(),
    lastName: Joi.string().min(2).max(40).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim(),
    password: Joi.string().min(6).max(8).required().trim(),
    confirmPassword: Joi.ref('password')
});

export const validateUserLogin = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim(),
    password: Joi.string().min(6).max(8).required().trim()
   });