import express from "express";
// import verifyToken from "../TokenVerification/verifyTokens.js"
import { getUser, createUser, updateUser, deleteUser, loginUser } from "../controller/usersController.js";
const routes = express.Router();

// Get request
routes.get('/', verifyToken, getUser);

// Post request
routes.post('/', createUser);

//  put request
routes.put('/:id', verifyToken, updateUser);

// // Delete request
routes.delete('/:id', verifyToken, deleteUser);
//  Login user
routes.post('/loginUser', loginUser);
//function to verify token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'undefined') {
        const bearer = authHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}
// //Exports router
export default routes;