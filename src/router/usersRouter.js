import express from "express";
import verifyToken from "../TokenVerification/verifyTokens.js"
import { getUser, createUser, updateUser, deleteUser, loginUser, getOneUser } from "../controller/usersController.js";
const routes = express.Router();

/* Get request*/
routes.get('/', verifyToken, getUser);
routes.get('/:id', verifyToken, getOneUser);

/*Post request*/
routes.post('/', createUser);

/* put request*/
routes.put('/:id', verifyToken, updateUser);

/*Delete request*/
routes.delete('/:id', verifyToken, deleteUser);
/* Login user*/
routes.post('/loginUser', loginUser);
/*Exports router*/
export default routes;