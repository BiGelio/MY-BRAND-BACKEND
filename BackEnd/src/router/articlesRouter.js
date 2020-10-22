import express from "express";
import { getArticle, postArticle, updateArticle, deleteArticle } from "../controller/articlesController.js";
const routes = express.Router();

// Get request
routes.get('/getArticle', getArticle);

// Post request
routes.post('/postArticle', postArticle);

// put request
routes.put('/updateArticle/:id', updateArticle);

// Delete request
routes.delete('/deleteArticle/:id', deleteArticle);

export default routes;