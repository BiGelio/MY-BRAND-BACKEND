import Joi from "joi"
export const validateArticle = Joi.object().keys({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(2).required()
});