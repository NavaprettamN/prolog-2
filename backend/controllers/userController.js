const userData = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userSignup = async (req, res) => {
    // check if the email is present
    try 
    {    
        const {name, email, password} = req.body;
        const existingUser = await userData.findOne({email: email});
        if(existingUser) res.status(400).send("The user exsists");
        
        // then put the username into the database
        else {
            const hashed_password = await bcrypt.hash(password, 10); //salt number something
            const createUser = await userData.create({name: name, email: email, password: hashed_password});
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
            res.status(200).send("User created");
        }
    }
    catch(err) {
        res.status(500).send("internal server error");
    }
    // login once?

}

const userLogin = async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    try {
        const existingUser =  await userData.findOne({email: email});
        if(!existingUser) res.status(401).send("user does not exsist or incorrect password");
        else {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if(!passwordMatch) res.status(401).send("user does not exsist or incorrect password");
            else {
                const token = jwt.sign({userId : existingUser._id}, process.env.JSON_SECRET_KEY, {expiresIn: '6d',});
                // console.log("checkpoint 10");
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
                res.cookie('authcookie',token,{maxAge:6*60*60*24,httpOnly:true})
                res.status(200).send("Login successful");
            }
        }
    }
    catch(err) {
        res.status(500).send("internal server error");
    }
}

const userLogout = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.clearCookie('authcookie', {httpOnly: true, expires: new Date(0) }).send('cookie deleted');
}

const getUser = (req, res) => {
    const data = req.userId;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.json({"userId": data});
}
module.exports = {
    userLogin,
    userSignup,
    getUser,
    userLogout,
}