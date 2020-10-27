import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import model from "../models/usersModel.js";
import { validateUser, validateUserLogin } from "../validations/userValidation.js";

const usersModel = mongoose.model("users");
export const getUser = (req, res) => {
        /*Check if user has token required to access this router*/
        const verified = jwt.verify(
            req.token,
            process.env.ADMIN_ACCESS_TOKEN, (err) => {
                if (err) {
                    return res.status(401).json({ Message: "Please login as admin to view all users!" })
                }
            }
        )
        const data = usersModel.find((err, docs) => {
            if (err) {
                return res.sendStatus(401)
            }
            res.status(202).json({ docs })

        })
    }
    /*create new user*/
export const createUser = (req, res) => {
    const createdAt = Date(Date.now());
    /* Validate user inputs*/
    const valid = validateUser.validate(req.body);
    if (valid.error) {
        return res.status(400).json({ Message: valid.error.details[0].message });
    }

    const { fullName, email, password } = req.body;
    var user = {
        fullName: fullName,
        email: email,
        password: password,
        role: "member",
        createdAt: createdAt,
        updatedAt: Date(Date.now())
    }
    var users = [];
    const data = usersModel.find((err, docs) => {
        if (err) {
            return res.status(500).json({ Message: "Server error!" });
        }
        users = docs;
        /*Check if user  exists or not*/
        const userOne = users.find(u => { return u.email === email });
        if (userOne) {
            return res.status(409).json({ Message: "User already exist!" })
        }

        const newUser = new model(user);
        /*Lets create user account in our database*/
        const savedUser = newUser.save((err, response) => {
            if (err) {
                return res.status(501).json({
                    Message: "Error ocurred during creation of user, try again !"
                });
            }
            jwt.sign({ user }, process.env.ACCESS_TOKEN, (err, token) => {
                if (err) {
                    return res.status(404).json({ Message: "Login failed, Try again!" })
                }
                res.status(201).json({ Message: "User created successfully! You can login now", token });

            })

        })
    });
}

/*Update user information*/

export const updateUser = (req, res) => {
        jwt.verify(
            req.token,
            process.env.ACCESS_TOKEN,
            (err) => {
                if (err) {
                    return res.status(401).json({ Message: "Please login to update your data!" })
                }
            }
        )
        const valid = validateUser.validate(req.body);
        if (valid.error) {
            return res.status(400).json({ Message: valid.error.details[0].message });
        }

        const { firstName, lastName, email } = req.body;
        const data = usersModel.findByIdAndUpdate({ _id: req.params.id }, { firstName: firstName, lastName: lastName, email: email, updatedAt: new Date() }, (err) => {
            if (err) {
                return res.status(500).send("Your information does not updated, Try again!");
            }
            res.status(200).send("Your information updated successfully!");
        })
    }
    /* Delete user data*/

export const deleteUser = (req, res) => {
    jwt.verify(
        req.token,
        process.env.ACCESS_TOKEN || process.env.ADMIN_ACCESS_TOKEN,
        (err) => {
            if (err) {
                return res.status(401).json({ Message: "Please login to delete your account!" })
            }
        }
    )
    usersModel.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).send("Account does not deleted,Try again!")
        }
        res.status(200).send("Account deleted successfully!");

    })
}
export const loginUser = (req, res) => {
    /*receiving data from request*/
    const { email, password } = req.body;
    /* Validate user inputs*/
    const valid = validateUserLogin.validate(req.body);
    if (valid.error) {
        return res.status(400).json({ Message: valid.error.details[0].message });
    }
    var users = [];
    const data = usersModel.find((err, docs) => {
        if (err) {
            return res.status(500).json({ Message: "Server error!" })
        }
        users = docs;
        /*checking if user registered*/

        const user = users.find(u => { return u.email === email && u.password === password });
        if (!user) {
            return res.status(400).json({ Message: "User does not exists!" })
        }
        /*section for generating token*/
        if (user.role === 'member') {
            jwt.sign({ user }, process.env.ACCESS_TOKEN, (err, token) => {
                if (err) {
                    return res.status(401).json({ Message: "Login failed, Try again!" })
                }
                res.json({
                    Message: "Welcome " + user.firstName + " " + user.lastName,
                    Role: "member",
                    token
                })
            })
        } else {
            jwt.sign({ user }, process.env.ADMIN_ACCESS_TOKEN, (err, token) => {
                if (err) {
                    return res.status(401).json({ Message: "Login failed, Try again!" })
                }
                res.json({
                    Message: "Welcome " + user.fullName,
                    Role: "Admin",
                    token
                })
            })
        }

    });

}