const mongoose = require("mongoose");
const postArticle = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: { type: Date }

});
module.exports = mongoose.model("articles", postArticle);