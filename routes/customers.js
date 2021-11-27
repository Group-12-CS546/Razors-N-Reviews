const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const users = require('../data/customers');
const mongoCollections = require('../config/mongoCollections');
const users1 = mongoCollections.customers;
let { ObjectId } = require('mongodb');
 

 
router.get("/signup", (req, res) => {
    if (!req.session.AuthCookie)
        res.render("users/signup", { title: "Signup", heading: "Signup" });
    else
        res.redirect("/private");
});


router.get("/", (req, res) => {
    if (!req.session.AuthCookie)
        res.render("users/login", { title: "Login", heading: "Login" });
    else
        res.redirect("/private");
});

router.post("/login", async(req, res) => {
    console.log(req.body);
    let errorcode = false;
    const errors = [];
    if (!req.body.username) {
        errorcode = true;
        res.status(400);
        return res.render("users/login", { errorcode: errorcode, errors: errors, message: "Please provide a username" });
    }

    if (!req.body.password) {
        errorcode = true;
        res.status(400);
        return res.render("users/login", { errorcode: errorcode, errors: errors, message: "Please provide a password" });
    }
    if (req.body.username.length == 0) {
        errorcode = true;
        res.status(400);
        return res.render("users/login", { errorcode: errorcode, errors: errors, message: "Username cannot be null or empty" });
    }
   
    if (typeof req.body.username != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("users/login", { errorcode: errorcode, errors: errors, message: "Please enter username of type string" });
    }
 
    var regex = /^[a-zA-Z0-9.\-]{4,30}$/;
    if (!req.body.username.match(regex)) {
        errorcode = true;
        res.status(400);
        return res.render("users/login", { errorcode: errorcode, errors: errors, message: "Only Alphanumeric username is allowed and username should be more than 4 characters " });
    }
 
    if (req.body.password.length == 0) {
        errorcode = true;
        res.status(400);
        return res.render("users/login", { errorcode: errorcode, errors: errors, message: "Password cannot be null or empty" });
    }
 
    if (typeof req.body.password != 'string') {
        errorcode= true;
        res.status(400);
        return res.render("users/login", { hasErrors: hasErrors, errors: errors, message: "The entered password must be string only" });
    }
    var len;
    for (var i = 0, len = req.body.password.length; i < len; ++i) {
        if (req.body.password.charAt(i) === ' ') {
            errorcode= true;
            res.status(400);
            return res.render("users/login", { hasErrors: hasErrors, errors: errors, message: "Username cannot have spaces!" });
        }
    }
    if (req.body.password.length < 6) {
        errorcode= true;
        res.status(400);
        return res.render("users/login", { hasErrors: hasErrors, errors: errors, message: "Password should be greater than 6 characters" });
    }
    if (req.body.username.trim().length == 0) {
        errorcode= true;
        res.status(400);
        return res.render("users/login", { hasErrors: hasErrors, errors: errors, message: "Username cannot be only spaces" });
    }
    if (req.body.password.trim().length == 0) {
        errorcode= true;
        res.status(400);
        return res.render("users/login", { hasErrors: hasErrors, errors: errors, message: "Password cannot be only spaces" });
    }
    
 
    const userData = req.body;
    console.log("userData", userData)
    try {
        console.log(userData.username,userData.password)
        const user = await users.checkUser(userData.username, userData.password);
        if (user) {
            req.session.AuthCookie = userData.username;
            console.log("req.session.AuthCookie", req.session.AuthCookie)
            console.log("userdata******", userData);
            req.session.user = { Username: userData.username, Password: userData.password };
            console.log(req.session.user, "req.session.user")
            res.status(200).render("users/private", { username: userData.username, title: "Login", heading: "Login" });
        } else {
            res.status(400);
            res.render("users/login", { error: "Either the username or password is invalid", title: "Login", heading: "Login", message: "Either the username or password is invalid" });
        }
    } catch (error) {
       
        res.status(400);
        res.render("users/login", { error: "Either the username or password is invalid", title: "Login", heading: "Login", message: "Either the username or password is invalid" });
    }
 
});
 
 
router.post("/signup", async(req, res) => {
    console.log(req.body);
    let errorcode= false;
    const errors = [];
    // if (!req.body.username) {
    //     errorcode = true;
    //     res.status(400);
    //     return res.render("users/signup", { errorcode: true, errors: errors, message: "Username is not supplied" });
    // }
    // if (!req.body.password) {
    //     errorcode = true;
    //     res.status(400);
    //     return res.render("users/signup", { errorcode: true, errors: errors, message: "Password is not supplied" });
    // }
    // if (req.body.username.length == 0) {
    //     errorcode = true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, errorcode: true, message: "Username cannot be null or empty"});
    // }
   
    // if (typeof req.body.username != 'string') {
    //     errorcode = true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, errorcode: true, message: "Username must be string"});
    // }
    // var regex = /^[a-zA-Z0-9.\-]{4,30}$/;
    // if (!req.body.username.match(regex)) {
    //     errorcode = true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, errorcode: true, message: "Enter username which contains alphanumeric values, without spaces and should be greater than 4"});
    // }
    // if (req.body.password.length == 0) {
    //     errorcode = true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, errorcode: true, message: "password cannot be null or empty" });
    // }
    // if (typeof req.body.password != 'string') {
    //     errorcode= true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, hasErrors: true, message: "The entered password must be a string" });
    // }
    // var len;
    // for (var i = 0, len = req.body.password.length; i < len; ++i) {
    //     if (req.body.password.charAt(i) === ' ') {
    //         errorcode= true;
    //     res.status(400);
    //         res.render('users/signup', { errors: errors, hasErrors: true, message: "Name cannot have spaces!" });
    //     }
    // }
    // if (req.body.password.length < 6) {
    //     errorcode = true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, hasErrors: true, message: "Password should be greater than 6 characters" });
    // }
    // if (req.body.username.trim().length == 0) {
    //     errorcode = true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, hasErrors: true, message: "Username cannot have spaces" });
    // }
    // if (req.body.password.trim().length == 0) {
    //     errorcode = true;
    //     res.status(400);
    //     res.render('users/signup', { errors: errors, hasErrors: true, message: "Password cannot have spaces" });
    // }
  
    const userData = req.body;
    console.log("userData", userData)
   
  
    try {
        console.log("*something new inside try")
        const user = await users.createUser(userData.firstname,userData.lastname,userData.email,userData.username, userData.password,userData.profilePicture,userData.state,userData.city,userData.age);

        console.log("User inside try",user)
        if(user == null)
        {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errorcode: true, message: "Username already exists with that username" });
  
        }
        else{
            if (user) {
                console.log("user****", user)
                
                res.status(200).render("users/login", { message: "You have successfully signed up", title: "Login", heading: "Login" });
            } else {
                res.status(400);
                res.render("users/signup", { message: "Either the username or password is invalid, Please signup again", title: "Signup", heading: "Signup" });
            }
        }
       
       
    } catch (error) {
        res.status(500);
        res.render("users/signup", { message: "Internal server error", title: "Login", heading: "Login" });
    }
 });
 

 
router.get("/logout", (req, res) => {
    if (!req.session.AuthCookie)
        res.redirect("/");
    else {
        req.session.destroy();
        res.render("users/logout", { title: "Logout", heading: "Logout", message: "User successfully logged out", msg: true });
    }
});

 router.get("/private", (req, res) => {
 
 
    console.log("req.body", req.session.user.Username)
 
    let user = req.session.user;
    console.log("user******", user)
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('users/private', {
            username: req.session.user.Username
        });
    }
 
});
module.exports = router;

