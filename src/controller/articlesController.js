import mongoose from "mongoose";
import articleModel from "../models/articlesModel.js";
/* Controller get article request*/
const articlesModel = mongoose.model("articles");
export const getArticle = async(req, res) => {
    const data = await articlesModel.find((err, docs) => {
        if (err) throw new err;
        console.log(docs);
        res.send(docs);
    })
}


/* Controller post article request*/
export const postArticle = async(req, res) => {
    var output = req.body;
    
    const posts = new articleModel({
        title: output.title,
        description: output.description,
        date: Date(Date.now())
    });
    var savePost = await posts.save().then(() => {
        res.send(`Title:${output.title}\n Description:${output.description}\n date:${Date(Date.now())}`);
        console.log(output.title + "\n " + output.description + "\n " + Date(Date.now()));
        console.log("saved to db!")
    })
}

/* Controller update article request*/
export const updateArticle = (req, res) => {
    const data = articlesModel.findByIdAndUpdate({ _id: req.params.id }, { title: "your songs", description: "That album is house of your songs!", date: new Date() }, (err) => {
        if (!err) {
            res.status(200).send("Article updated successfully!");
        }

    })
}

/* Controller delete article request*/
export const deleteArticle = (req, res) => {
    articlesModel.remove({ _id: req.params.id }, (err) => {
        if (!err) {
            res.status(200).send("Article deleted successfully!");
        } else {
            console.log(err);
        }
    })

}