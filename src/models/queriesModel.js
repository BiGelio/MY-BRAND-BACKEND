import mongoose from "mongoose";
const createQuery = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
 type: String,
required: true
    },
    Message: {
        type: String,
        required: true
    },
    createdAt: { type: String }

});
export default mongoose.model("queries", createQuery);