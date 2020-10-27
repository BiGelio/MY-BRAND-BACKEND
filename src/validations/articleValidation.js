import Joi from "joi"

const validateArticle = Joi.object().keys({
    title: Joi.string().min(3).max(40).required(),
    description: Joi.string().min(2).max(40).required()
});
export default validateArticle;

