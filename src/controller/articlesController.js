import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import articleModel from "../models/articlesModel.js";
import checkInputs from "../validations/articleValidation.js"
const articlesModel = mongoose.model("articles");
export const getArticle = async(req, res) => {
    const data = await articlesModel.find((err, docs) => {
        if (err) {
            return res.status(500).json({ Message: "Error occurred on server!" })
        }
        res.status(200).send(docs);
    })
}


/* Controller post article request*/
export const postArticle = async(req, res) => {

    jwt.verify(
        req.token,
        process.env.ADMIN_ACCESS_TOKEN, (err) => {
            if (err) {
                return res.status(401).json({ Message: "Please login as admin to create new article!" })
            }
        }
    )
    const valid = checkInputs.validate(req.body);
    if (valid.error) {
        return res.status(400).json({ Message: valid.error.details[0].message });
    }
    const { title, description } = req.body;
    const posts = new articleModel({
        title: title,
        description: description,
        createdAt: Date(Date.now())
    });
    var savePost = await posts.save().then((err) => {
        if (err) {
            return res.status(500).json({
                Message: "Failed to create article,try again!"
            })
        }
        res.status(201).json({
            Message: "Article created successfully!"
        })
    })
}

/* Controller update article request*/
export const updateArticle = (req, res) => {
    jwt.verify(
        req.token,
        process.env.ADMIN_ACCESS_TOKEN, (err) => {
            if (err) {
                return res.status(401).json({ Message: "Please login as admin to update article!" })
            }
        }
    )
    const valid = checkInputs.validate(req.body);
    if (valid.error) {
        return res.status(400).json({ Message: valid.error.details[0].message });
    }
    const data = articlesModel.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title, description: req.body.title.description, updatedAt: new Date() }, (err) => {
        if (err) {
            return res.status(500).send("Error occurred n server,try again!");
        }
        res.status(200).send("Article updated successfully!");
    })
}

/* Controller delete article request*/
export const deleteArticle = (req, res) => {
    jwt.verify(
        req.token,
        process.env.ADMIN_ACCESS_TOKEN, (err) => {
            if (err) {
                return res.status(401).json({ Message: "Please login as admin to delete article!" })
            }
        }
    )
    articlesModel.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(200).json({
                Message: "Deletion failed, try again!"
            });
        }
        res.status(200).json({
            Message: "Article deleted successfully!"
        });

    })

}