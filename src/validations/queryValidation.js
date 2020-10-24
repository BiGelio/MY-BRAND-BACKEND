import Joi from "joi"
 const validateQuery = Joi.object().keys({
    fullName: Joi.string().min(2).max(40).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim(),
    Message: Joi.string().min(5).required()
});
export default validateQuery;
