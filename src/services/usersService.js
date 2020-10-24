import mongoose from "mongoose";
import model from "../models/usersModel.js";
export const getUserInfo= () =>{
     const data = usersModel.find((err, docs) => {
            if (err) {
                return res.sendStatus(403)
            }
            res.status(202).json({ docs })

        })
}
export const createUserInfo=(user)=>{
    var users = [];
    const data = usersModel.find((err, docs) => {
        if (err) {
            return res.status(500).json({ Message: "Server error!" });
        }
        users = docs;
        //Check if user  exists or not
        const userOne = users.find(u => { return u.email === email });
        if (userOne) {
            return res.status(406).json({ Message: "User already exist!" })
        }

        const newUser = new model(user);
        /*Lets create user account in our database*/
        const savedUser = newUser.save((err, response) => {
            if (err) {

                return res.status(500).json({
                    Message: "Error ocurred during creation of user, try again !"
                });
            }
            res.status(201).json({ Message: "User created successfully! You can login now" });
        })
    });
}
export const updateUserInfo=()=>{
     const data = usersModel.findByIdAndUpdate({ _id: req.params.id }, { date: new Date() }, (err) => {
            if (err) {
                return res.status(500).send("Your information does not updated, Try again!");
            }
            res.status(200).send("Your information updated successfully!");
        })
}
export const deleteUserInfo=()=>{
    usersModel.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).send("Account does not deleted,Try again!")
        }
        res.status(200).send("Account deleted successfully!");

    })
}