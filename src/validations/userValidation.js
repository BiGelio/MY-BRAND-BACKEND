import Joi from "joi"
export const validateUser = Joi.object().keys({
    fullName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim(),
    password: Joi.string().min(6).max(8).required().trim(),
    confirmPassword: Joi.ref('password')
});

export const validateUserLogin = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim(),
    password: Joi.string().min(6).max(8).required().trim()
});