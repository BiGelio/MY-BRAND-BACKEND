const express = require("express");
const controller = require("../controller/usersController");
const routes = express.Router();

// Get request
routes.get('/getUser', controller.getUser);

// Post request
routes.post('/createUser', controller.createUser);

// put request
routes.put('/updateUser', controller.updateUser);

// Delete request
routes.delete('/deleteDelete', controller.deleteUser);

module.exports = routes;