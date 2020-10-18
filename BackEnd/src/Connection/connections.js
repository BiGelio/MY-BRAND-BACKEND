const mongoClient = require("mongodb").MongoClient;
const db = mongoClient.connect(process.env.db_url + "/articlesDatabase");
console.log("db connected well!")