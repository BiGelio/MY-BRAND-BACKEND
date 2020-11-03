import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import model from "../models/queriesModel.js";
import validateQuery from "../validations/queryValidation.js";
const queriesModel = mongoose.model("queries");
export const createQuery = (req, res) => {
    const createdAt = Date(Date.now());
    /* Validate user inputs*/
    const valid = validateQuery.validate(req.body);
    if (valid.error) {
        return res.status(406).json({ Message: valid.error.details[0].message });
    }

    const { fullName, email, Message } = req.body;
    var query = {
        fullName: fullName,
        email: email,
        Message: Message,
        createdAt: createdAt
    }

    const newQuery = new model(query);
    /*Lets create user account in our database*/
    const savedQuery = newQuery.save((err, response) => {
        if (err) {

            return res.status(500).json({
                Message: "Error ocurred during creation of query, try again !"
            });
        }
        jwt.sign({ query }, process.env.ACCESS_TOKEN, (err, token) => {
            if (err) {
                return res.status(404).json({ Message: "Query failed, Try again!" })
            }
            res.status(201).json({ Message: "Query created successfully!", token });

        })

    })

}

export const getQueries = (req, res) => {
    /**Check if user has token required to access this router**/
    const verified = jwt.verify(
        req.token,
        process.env.ADMIN_ACCESS_TOKEN, (err) => {
            if (err) {
                return res.status(401).json({ Message: "Please login as admin to view all users!" })
            }
        }
    )
    const data = queriesModel.find((err, docs) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        res.status(202).json({ docs })

    })
}

export const deleteQuery = (req, res) => {
    /**Check if user has token required to access this router**/
    jwt.verify(
        req.token, process.env.ADMIN_ACCESS_TOKEN,
        verifyUserBeforeDelete
    )
    queriesModel.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).send("Query does not deleted,Try again!");
        }
        res.status(200).send("Query deleted successfully!");


    })
}