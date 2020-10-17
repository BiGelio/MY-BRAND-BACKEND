// import express package
const express = require("express");
require("dotenv/config");
const app = express();
// Import router module
const articlesRoute = require("./src/router/articlesRouter.js");
const usersRoute = require("./src/router/usersRouter.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use('/api/article', articlesRoute);
app.use('/api/user', usersRoute);
const mongoose = require("mongoose");
mongoose.connect(process.env.db_url + "/articlesDatabase", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw new err;
    console.log("DB connected successfully!")
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port number ${process.env.PORT}`)
})