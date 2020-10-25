import mongoose from "mongoose";
const createArticle = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }

});
export default mongoose.model("articles", createArticle);