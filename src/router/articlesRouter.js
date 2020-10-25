import express from "express";
import verifyToken from "../TokenVerification/verifyTokens.js"
import { getArticle, postArticle, updateArticle, deleteArticle } from "../controller/articlesController.js";
const routes = express.Router();

/* Get request*/
routes.get('/', getArticle);

/* Post request*/
routes.post('/', verifyToken, postArticle);

/* put request*/
routes.put('/:id', verifyToken, updateArticle);

/*Delete request*/
routes.delete('/:id', verifyToken, deleteArticle);

export default routes;