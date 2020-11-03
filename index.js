// import express package
import express from "express";
import dotenv from 'dotenv';
dotenv.config()

const app = express();
// Import router module
import articlesRoute from "./src/router/articlesRouter.js";
import usersRoute from "./src/router/usersRouter.js";
import queriesRoute from "./src/router/queriesRouter.js";
import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use('/api/article', articlesRoute);
app.use('/api/user', usersRoute);
app.use('/api/query', queriesRoute);
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL + "/articlesDatabase", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("DB connected successfully!")
});
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const options = {
    swaggerDefinition: {
        info: {
            title: "Backend API documentation",
            description: "This is documentation of our backend apis.",
            contact: {
                name: "Bi Gelio",
                url: "https://bigelio.github.io/MY-BRAND-BACKEND/UI/contact.html",

                email: "bigelio77@gmail.com"
            }
        },
        servers: [{
            url: "desolate-bayou-90268.herokuapp.com"
        }]
    },
    apis: ['index.js']
};
const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
/**
 * @swagger
 * /api/uer:
 *  get:
 *    description: Use to get all users
 *    responses:
 *     '200':
 *       description: A successful response
 */
/**
 * @swagger
 * /api/user:
 *  post:
 *    description: create new user
 *    responses:
 *     '200':
 *       description: User created successful
 */
/**
 * @swagger
 * /api/uer:
 *  put:
 *    description: Update user information
 *    responses:
 *     '200':
 *       description: User information updated successful.
 */
/**
 * @swagger
 * /api/user:
 *  delete:
 *    description: Delete user account
 *    responses:
 *     '200':
 *       description: User deleted successful
 */
/**
 * @swagger
 * /api/user/loginUser:
 *  post:
 *    description: Login user account
 *    responses:
 *     '200':
 *       description: Login successful and redirect to welcome page
 */
/**
 * @swagger
 * /api/article:
 *  get:
 *    description: Use this get all articles
 *    responses:
 *     '200':
 *       description: List of all articles
 */
/**
 * @swagger
 * /api/article:
 *  post:
 *    description: create new  article
 *    responses:
 *     '200':
 *       description: Article created successful
 */
/**
 * @swagger
 * /api/article:
 *  put:
 *    description: Update article details
 *    responses:
 *     '200':
 *       description: Article details  updated successful.
 */
/**
 * @swagger
 * /api/article:
 *  delete:
 *    description: Delete article with all details on that article.
 *    responses:
 *     '200':
 *       description: Article deleted successful
 */
/**
 * @swagger
 * /api/query:
 *  post:
 *    description: Create query
 *    responses:
 *     '200':
 *       description: Query submitted successful.
 */
/**
 * @swagger
 * /api/query:
 *  delete:
 *    description: Delete query with all details on that query.
 *    responses:
 *     '200':
 *       description: query deleted successful
 */
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port number ${process.env.PORT}`)
})