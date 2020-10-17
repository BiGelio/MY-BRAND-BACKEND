const mongoose = require("mongoose")
const articleModel = require("../models/articlesModel.js")
    // Controlle get article request
const articlesModel = mongoose.model("articles");
exports.getArticle = async(req, res) => {
    const data = await articlesModel.find((err, docs) => {
        if (err) throw new err;
        console.log(docs);
        res.send(docs);
    })
}


// Controlle post article request
exports.postArticle = async(req, res) => {
    var output = req.body;
    // "New request for post article submitted!"
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

// Controlle update article request
exports.updateArticle = (req, res) => {
    const data = articlesModel.findByIdAndUpdate({ _id: req.params.id }, { title: "your songs", description: "That album is house of your songs!", date: new Date() }, (err) => {
        if (!err) {
            console.log("updated successfully!")
            res.send("Document updated successfully!");
        }

    })
}

// Controlle delete article request
exports.deleteArticle = (req, res) => {
    articlesModel.remove({ _id: req.params.id }, (err) => {
        if (!err) {
            console.log("Document deleted successfully!");
            res.send("New request for delete article submitted!");
        } else {
            console.log(err);
        }
    })

}