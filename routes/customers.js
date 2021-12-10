 
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const users = require('../data/customers');
const mongoCollections = require('../config/mongoCollections');
const users1 = mongoCollections.customers;
const customers = mongoCollections.customers;
let { ObjectId } = require('mongodb');
const xss = require('xss');
const reviewsData = require('../data/reviews');
const salData = require('../data/salons')
 
 
 
router.get("/signup", (req, res) => {
    if (!req.session.AuthCookie)
        res.render("users/signup", { title: "Signup", heading: "Signup" });
    else
        res.redirect("/private");
});
 
/*
TODO:Delete Routes
*/
router.get('/delete', async (req, res) => {
    if (!req.session.AuthCookie){
 
        res.render("users/signup", { title: "Signup", heading: "Signup" });
 
    }
    else{
        let errorcode = false;
    console.log("helooooooooooooooooooooooooooooooooooooooooooooooo")
    let tempId=req.session.user.id
    tempId = tempId.toString(tempId);
    console.log(tempId,"00000000000000000")
    // if (!req.params.userId) {
    //  res.status(400)
    //     res.render("users/signup", { title: "Signup", heading: "Signup" });
    //  return;
    // }
    try {
       
        deleteuser = await users.deleteCustomerbyId(tempId);
    if(deleteuser){
        errorcode = true;
        res.status(500);
        return res.render("users/signup", {title: "Signup", heading: "Signup" , errorcode: errorcode, message: "Please create  an account again." });
 
    } else {
        return res.render("users/private", {title: "Signup", heading: "Signup" , errorcode: errorcode, message: "User not deleted" });
    }
        //res.json({deleted: true, data: toBeDeletedReview});
    } catch (e) {
        return res.render("users/private", { errorcode: errorcode, message: "User not deleted" });
    }
    }
});
 
// router.post("/:id/delete",async (req, res) => {
   
 
//     if (!req.session.AuthCookie){
//         res.status(400);
//         res.render("users/signup", { title: "Signup", heading: "Signup" });
 
//     }
 
   
//     else{
       
//         req.params.id=req.session.user._id
//         let user_delete_id=req.params.id
//         console.log(user_delete_id,"!!!!!!!!!!!!!!!!!!!!!!**********************!!!!!")
//         // const currentUser = await users.getCustomerById(req.session.user._id);
//         // const customerCollection = await customers();
//         const user_deleted = await customerCollection.deleteOne({user_delete_id});
//         res.status(200);
//         return res.render("users/signup", {id: req.params.id, errorcode: errorcode, errors: errors, message: "Your account has been deleted please SignUp to create a new account." });
//     }
// })
 
 
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
        return res.render("users/login", {errorcode: errorcode, hasErrors: hasErrors, errors: errors, message: "The entered password must be string only" });
    }
    var len;
    for (var i = 0, len = req.body.password.length; i < len; ++i) {
        if (req.body.password.charAt(i) === ' ') {
            errorcode= true;
            res.status(400);
            return res.render("users/login", {errorcode: errorcode, hasErrors: hasErrors, errors: errors, message: "Username cannot have spaces!" });
        }
    }
    if (req.body.password.length < 6) {
        errorcode= true;
        res.status(400);
        return res.render("users/login", {errorcode: errorcode, hasErrors: hasErrors, errors: errors, message: "Password should be greater than 6 characters" });
    }
    if (req.body.username.trim().length == 0) {
        errorcode= true;
        res.status(400);
        return res.render("users/login", {errorcode: errorcode, hasErrors: hasErrors, errors: errors, message: "Username cannot be only spaces" });
    }
    if (req.body.password.trim().length == 0) {
        errorcode= true;
        res.status(400);
        return res.render("users/login", {errorcode: errorcode, hasErrors: hasErrors, errors: errors, message: "Password cannot be only spaces" });
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
            console.log(req.session.user.Username,"=================")
            const customerCollection = await customers();
            customer_name=req.session.user.Username;
            console.log(customer_name,"-----customername----------")
           
            const customer_details = await customerCollection.findOne({username:req.session.user.Username});
            console.log("*********",customer_details)
            console.log("*********",customer_details._id)
                       userid=customer_details._id
                       session_user_id =userid.toString()
           
                       /*
                       TODO:REMAINING
                       */
                       const testid = customer_details._id
                       req.session.user = {id: testid}
                       console.log(req.session.user, "req.session.user")
           
            // req.session.user = { Username: userData.username, Password: userData.password,cust_id:session_user_id };
           
            console.log("req session 733333333333333333337333333333333333333", req.session.user)
            console.log(req.session.user, "req.session.user")


            const getReviews = await reviewsData.getReviewsPerCustomer(req.session.user.id);
            console.log(getReviews, 'getReviews************')

            // var sal = []
            // for(var i =0; i<getReviews.length; i++)
            // {
            //     sal = await salData.get(getReviews[i].salonId)
            // }

            // console.log(sal, 'sal from routes')


            res.status(200).render("users/private", {age:customer_details.age,state:customer_details.state,city:customer_details.city,email:customer_details.email,email:customer_details.email,firstname: customer_details.firstname,lastname: customer_details.lastname, username: customer_details.username, title: "Login", heading: "Login" , getReviews: getReviews});
        } else {
            errorcode= true;
            res.status(400);
            return res.render("users/login", {errorcode: errorcode, error: "Either the username or password is invalid", title: "Login", heading: "Login", message: "Either the username or password is invalid" });
        }
    } catch (error) {
        errorcode= true;
       
        res.status(400);
        return res.render("users/login", {errorcode: errorcode, error: "Either the username or password is invalid", title: "Login", heading: "Login", message: "Either the username or password is invalid" });
    }
 
});
 
 
 
 
router.post("/signup", async(req, res) => {
    console.log(req.body);
    let errorcode= false;
    const errors = [];
    if (!req.body.firstname) {
        errorcode = true;
        res.status(400);
        return res.render("users/signup", { errorcode: errorcode, errors: errors, message: "First name is not supplied" });
    }
    if (!req.body.lastname) {
        errorcode = true;
        res.status(400);
        return res.render("users/signup", { errorcode: errorcode, errors: errors, message: "lastname is not supplied" });
    }
    if (!req.body.username) {
        errorcode = true;
        res.status(400);
        return res.render("users/signup", { errorcode: errorcode, errors: errors, message: "Username is not supplied" });
    }
    if (!req.body.password) {
        errorcode = true;
        res.status(400);
        return res.render("users/signup", { errorcode: errorcode, errors: errors, message: "Password is not supplied" });
    }
    if (req.body.username.length == 0) {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errorcode: errorcode ,errors: errors, message: "Username cannot be null or empty"});
    }
   
    if (typeof req.body.username != 'string') {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errorcode: errorcode , message: "Username must be string"});
    }
    var regex = /^[a-zA-Z0-9.\-]{4,30}$/;
    if (!req.body.username.match(regex)) {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errorcode: errorcode , errors: errors, errorcode: true, message: "Enter username which contains alphanumeric values, without spaces and should be greater than 4"});
    }
    if (req.body.password.length == 0) {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errors: errors,  errorcode: errorcode ,message: "password cannot be null or empty" });
    }
    if (typeof req.body.password != 'string') {
        errorcode= true;
        res.status(400);
        res.render('users/signup', { errorcode: errorcode ,errors: errors, hasErrors: true, message: "The entered password must be a string" });
    }
    var len;
    for (var i = 0, len = req.body.password.length; i < len; ++i) {
        if (req.body.password.charAt(i) === ' ') {
            errorcode= true;
        res.status(400);
            res.render('users/signup', { errorcode: errorcode , errors: errors, hasErrors: true, message: "Name cannot have spaces!" });
        }
    }
    if (req.body.password.length < 6) {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errorcode: errorcode ,errors: errors, hasErrors: true, message: "Password should be greater than 6 characters" });
    }
    if (req.body.username.trim().length == 0) {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errorcode: errorcode , errors: errors, hasErrors: true, message: "Username cannot have spaces" });
    }
    if (req.body.password.trim().length == 0) {
        errorcode = true;
        res.status(400);
        res.render('users/signup', { errorcode: errorcode , errors: errors, hasErrors: true, message: "Password cannot have spaces" });
    }
 
    const userData = req.body;
    console.log("userData", userData)
   
 
   
        console.log("*something new inside try")
        const user = await users.createUser(userData.firstname,userData.lastname,userData.email,userData.username, userData.password,userData.profilePicture,userData.state,userData.city,userData.age);
 
        console.log("User inside try",user)
        if(user == null)
        {
        errorcode = true;
        res.status(400);
        res.render('users/signup', {  errorcode: errorcode , message: "Username already exists with that username" });
 
        }
        else{
            if (user) {
                errorcode = true;
                console.log("user****", user)
               
                res.status(200).render("users/login", { errorcode: errorcode , message: "You have successfully signed up", title: "Login", heading: "Login" });
            } else {
                res.status(400);
                res.render("users/signup", {errorcode: errorcode , message: "Either the username or password is invalid, Please signup again", title: "Signup", heading: "Signup" });
            }
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
 
 router.get("/private",async (req, res) => {
 
    if (!req.session.AuthCookie) {
        res.redirect('/');
    } else {
        res.render('users/private', {
            username: req.session.user.Username,
            firstName: currentUser.firstname,
            lastName: currentUser.lastname,
        });
    }
     
     
     
   
 
});
module.exports = router;