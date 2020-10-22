import Joi from "joi"
const validateUser = Joi.object().keys({
    firstName: Joi.string().min(2).max(40).required(),
    lastName: Joi.string().min(2).max(40).required(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(8).required().trim(),
    role: Joi.string().min(2).max(10).required(),
})
export default validateUser;