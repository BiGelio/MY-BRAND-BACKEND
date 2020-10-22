import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import model from "../models/usersModel.js";
import validateUser from "../validations/userValidation.js"
const usersModel = mongoose.model("users");
export const getUser = (req, res) => {
        jwt.verify(
            req.token,
            process.env.ACCESS_TOKEN,
            (err, token) => {
                if (!err) {
                    const data = usersModel.find((err, docs) => {
                        if (err) {
                            res.sendStatus(403)
                        } else { res.json({ docs }) }
                    })
                } else {
                    res.json({ Message: "Please login as admin to view all users!" })
                }
            })
    }
    // create new user
export const createUser = (req, res) => {
    const createdAt = Date(Date.now());
    // Validate user inputs
    const valid = validateUser.validate(req.body);
    if (valid.error) {
        return res.json({ Message: valid.error.details[0].message });
    }

    const { firstName, lastName, email, password, role } = req.body;
    var user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role,
        createdAt: createdAt
    }
    var users = [];
    const data = usersModel.find((err, docs) => {
        if (!err) {
            users = docs;
            const userOne = users.find(u => { return u.email === email });
            if (userOne) {
                res.json({ Message: "User already exist!" })
            } else {
                const newUser = new model(user);
                const savedUser = newUser.save((err, response) => {
                    if (err) {

                        res.json({
                            Message: "Error ocurred during creation of user, try again !"
                        });
                    } else {
                        res.json({ Message: "User created successfully! You can login now" });
                    }

                })
            }
        } else {
            res.json({ Message: "Server error!" })
        }
    });
}

// Update user information

export const updateUser = (req, res) => {
    jwt.verify(
        req.token,
        process.env.ACCESS_TOKEN,
        (err, token) => {
            if (!err) {
                const data = usersModel.findByIdAndUpdate({ _id: req.params.id }, { date: new Date() }, (err) => {
                    if (!err) {
                        res.send("Your information updated successfully!");
                    }
                })
            } else {
                res.json({ Message: "Please login to update your data!" })

            }
        })
}

// Delete user data

export const deleteUser = (req, res) => {
    jwt.verify(
        req.token,
        process.env.ACCESS_TOKEN,
        (err, token) => {
            if (!err) {
                usersModel.remove({ _id: req.params.id }, (err) => {
                    if (!err) {
                        res.send("Document deleted successfully!");
                    } else {
                        res.send("Account does not deleted,Try again!")
                    }
                })

            } else {
                res.json({ Message: "Please login to delete your account!" })

            }
        })
}
export const loginUser = (req, res) => {
    //receiving data from request
    const { email, password } = req.body;
    var users = [];
    const data = usersModel.find((err, docs) => {
        if (!err) {
            users = docs;
            //checking if user registered

            const user = users.find(u => { return u.email === email && u.password === password });
            if (user) {
                //section for generating token


                jwt.sign({ user }, process.env.ACCESS_TOKEN, (err, token) => {
                    if (err) {
                        console.log(err)
                        res.json({ Message: "Login failed, Try again!" })
                    } else {

                        res.json({
                            token
                        })
                    }

                })

            } else {
                res.json({ Message: "User does not exists!" })
            }
        } else {
            res.json({ Message: "Server error!" })
        }
    });

}