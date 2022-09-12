
const express = require("express");
const router = express.Router();
require('dotenv').config()
const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddlewares")


// api         callback        
// for all mongodb operations we will use await keyword for functions to call
// now connect these endpoints to the server.js
router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {

            res.status(200).send({ message: "User Already Exists", success: false });

        }

        const password = req.body.password;

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;
        // reqbody has name,email,password
        const newUser = new User(req.body);
        // method to save new user to mongodb
        await newUser.save();
        res.status(200).send({ message: "User Created Successfully", success: true })



    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error creating User", success: true })

    }
})

router.post("/login", async (req, res) => {
    try {
        // first check if email provided matches the email in db or not then we will compare password
        const user = await User.findOne({ email: req.body.email });
       
        if (!user) {
            return
            res.status(400).send({ message: "User does not exist", success: false });

        }
        // bcrypt library compares normal pass with the encrypted password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        // if ismatch means pass & email is present in db now we will have to generate  token & store in frontend
        if (!isMatch) {
            res.status(200).send({ message: "Incorrect Password!", success: false });
        }
        else {
            // encrypting user id only
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            })
            res.status(200).send({ message: "Logging you in!", success: true, data: token });

        }
       
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in", success: false, error });

    }
});
// protected route 
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({
                message: "User does not Exist",
                success: false
            });
        }
        else{
            res.status(200).send({
                message:"User found & sending his details to frontend",
                success: true,
                data: {
                    name: user.name,
                    email: user.email,

                },
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in", success: false, error });

    }
        
    })

module.exports = router;