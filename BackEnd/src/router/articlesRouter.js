const express = require("express");
const controller = require("../controller/articlesController");
const routes = express.Router();

// Get request
routes.get('/getArticle', controller.getArticle);

// Post request
routes.post('/postArticle', controller.postArticle);

// put request
routes.put('/updateArticle/:id', controller.updateArticle);

// Delete request
routes.delete('/deleteArticle/:id', controller.deleteArticle);

module.exports = routes;