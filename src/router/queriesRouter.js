import express from "express";
import verifyToken from "../TokenVerification/verifyTokens.js"
import { getQueries, createQuery, deleteQuery } from "../controller/queriesController.js";
const routes = express.Router();

/* Get request*/
routes.get('/', verifyToken, getQueries);

/*Post request*/
routes.post('/', createQuery);

/*Delete request*/
routes.delete('/:id', verifyToken, deleteQuery);

export default routes;