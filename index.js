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
    if (err) throw new err;
    console.log("DB connected successfully!")
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port number ${process.env.PORT}`)
})