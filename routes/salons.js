const express = require('express');
const router = express.Router();
const data = require('../data');
const salonsData = data.salons;
const reviewsData = data.reviews;
const customers = data.customers;
const xss = require('xss');

router.get('/salons', async(req, res) => {
    try {
        const salonsList = await salonsData.getAll();
        res.status(200).render("salons/list", { salonsList });
    } catch (e) {
        res.status(400).render("salons/error", { error: e });
    }
});

router.get('/salons/:salonId', async(req, res) => {
    let errorcode = false;
    const errors = [];
    if (!req.params.salonId) {
        errorcode = true;
        res.status(400);
        return res.render("salons/error", { errorcode: errorcode, errors: errors, message: "should provide valid salon Id" });
    }
    if (typeof req.params.salonId != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/error", { errorcode: errorcode, errors: errors, message: "should provide salon Id in string" });
    }
    try {
        let salonsId = await salonsData.get(req.params.salonId);
        let getReviews = await reviewsData.getAllreviewsofSalon(req.params.salonId)
        console.log("getReviews", getReviews)

        res.status(200).render("salons/salonprofile", { salonId: salonsId._id, name: salonsId.name, website: salonsId.website, service: salonsId.service, address: salonsId.address, city: salonsId.city, state: salonsId.state, zip: salonsId.zip, rating: salonsId.rating, covidRating: salonsId.covidRating, longitude: salonsId.longitude, latitude: salonsId.latitude, getReviews: getReviews });
    } catch (e) {
        res.status(400).render("salons/error", { error: e });
    }
});

router.get("/manage", async(req, res) => {
    if (!req.session.AuthCookie) {
        res.status(400).render("salons/error", { message: "Please login to post a salon!!" });
    }
    try {
        const salonsList = await salonsData.getAll();
        res.status(200).render("salons/salonsignup", { salonsList: salonsList });
    } catch (e) {
        res.status(400).render("salons/error", { error: e });
    }
});

router.get("/manage", (req, res) => {
    console.log("req.session.AuthCookie*********", req.session.AuthCookie)
    if (!req.session.AuthCookie)
        res.redirect("salons/salonsignup", { title: "Login", heading: "Login" });
    else
        res.redirect("/manage");
});


router.post('/post', async(req, res) => {
    let salonInfo = req.body;
    salonInfo.name = xss(salonInfo.name)
    salonInfo.website = xss(salonInfo.website)
    salonInfo.service = xss(salonInfo.service)
    salonInfo.service = xss(salonInfo.service)
    salonInfo.address = xss(salonInfo.address)
    salonInfo.city = xss(salonInfo.city)
    salonInfo.state = xss(salonInfo.state)
    salonInfo.zip = xss(salonInfo.zip)
    salonInfo.longitude = xss(salonInfo.longitude)
    salonInfo.latitude = xss(salonInfo.latitude)

    let errorcode = false;
    const errors = [];
    if (!req.session.AuthCookie) {
        res.status(401).redirect("/");
    }
    if (!salonInfo) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please enter all the fields" });
    }
    if (!salonInfo.name) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a valid name" });

    }
    if (typeof salonInfo.name != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a name in string format" });
    }
    if (!salonInfo.website) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a valid website" });
    }
    if (typeof salonInfo.website != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a website in string" });
    }
    if (!salonInfo.service) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a valid service name" });
    }
    if (typeof salonInfo.service != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a service name in string" });
    }
    if (!salonInfo.address) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a valid address" });
    }
    if (typeof salonInfo.address != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a address in string" });
    }
    if (!salonInfo.city) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a city name" });
    }
    if (typeof salonInfo.city != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a city name in string" });
    }
    if (!salonInfo.state) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a state" });
    }
    if (typeof salonInfo.state != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a state name in string" });
    }
    if (!salonInfo.zip) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a zip code" });
    }
    if (typeof salonInfo.zip != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a zip code in string" });
    }
    if (!salonInfo.longitude) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a valid longitude" });
    }
    if (typeof salonInfo.longitude != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a longitude in string" });
    }
    if (!salonInfo.latitude) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a valid latitude" });

    }
    if (typeof salonInfo.latitude != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a latitude in string" });
    }
    var subStringHttp = "http://www."
    var subStringCom = ".com"
    if (subStringHttp == salonInfo.website.substr(0, subStringHttp.length)) {
        if (subStringCom == salonInfo.website.substr((salonInfo.website.length - 4), subStringCom.length)) {
            var strLength = salonInfo.website.length - (subStringHttp.length + subStringCom.length)
            if (strLength >= 5) {
                console.log("valid url")
            } else {
                errorcode = true;
                res.status(400);
                return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Entered url should have atleast 5 char" });
            }
        } else {
            errorcode = true;
            res.status(400);
            return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Entered url should end with .com" });
        }
    } else {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Entered url should start with http://www." });
    }


    try {
        const newSalon = await salonsData.create(
            salonInfo.name,
            salonInfo.website,
            salonInfo.service,
            salonInfo.address,
            salonInfo.city,
            salonInfo.state,
            salonInfo.zip,
            salonInfo.longitude,
            salonInfo.latitude
        );
        console.log("newSalon", newSalon)
        res.status(200).render("salons/message", { message: "Salon created successfully" });
    } catch (e) {
        res.status(400).render("salons/error", { message: "not created", error: e });
    }
});

router.get('/salons/:salonId/delete', async(req, res) => {
    let errorcode = false;
    const errors = [];
    if (!req.session.AuthCookie) {
        return res.render("salons/error", { errorcode: errorcode, errors: errors, message: "You cant delete this salon as you are not loggedIn!" });
    }
    if (!req.params.salonId) {
        errorcode = true;
        res.status(400);
        return res.render("salons/error", { errorcode: errorcode, errors: errors, message: "should provide valid salon Id to delete" });
    }
    if (typeof req.params.salonId != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/error", { errorcode: errorcode, errors: errors, message: "Salon ID should be in string" });
    }

    const user = req.session.user
    console.log("user", user.id)

    try {
        var getId = await salonsData.get(req.params.salonId);
        console.log("getId", getId);
        if (user.id == null || !user.id) {
            errorcode = true;
            res.status(400);
            return res.render("salons/error", { errorcode: errorcode, errors: errors, message: "You cant delete this salon as you are not loggedIn!" });
        } else {
            var deleteSalon = await salonsData.remove(req.params.salonId);
            if (deleteSalon) {
                return res.render("salons/delete", { message: "deleted" });
            } else {
                res.status(400).render("salons/error", { message: 'not deleted' });
            }
        }
    } catch (e) {
        res.status(400).render("salons/error", { error: 'Salon not found' });
        return;
    }

});

router.post('/salons/:salonId/edit', async(req, res) => {
    const updatedData = req.body;
    console.log("updatedData", updatedData)
    updatedData.name = xss(updatedData.name)
    updatedData.website = xss(updatedData.website)
    updatedData.service = xss(updatedData.service)
    updatedData.service = xss(updatedData.service)
    updatedData.address = xss(updatedData.address)
    updatedData.city = xss(updatedData.city)
    updatedData.state = xss(updatedData.state)
    updatedData.zip = xss(updatedData.zip)
    updatedData.longitude = xss(updatedData.longitude)
    updatedData.latitude = xss(updatedData.latitude)

    let errorcode = false;
    const errors = [];
    if (!req.session.AuthCookie) {
        res.status(401).render("salons/routemessage", { message: "Please you will have to login for editing a salon" });
    }
    if (!req.params.salonId) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "should provide valid Salon Id" });
    }
    if (typeof req.params.salonId != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Id should be in string" });
    }

    if (!updatedData) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please enter all the fields" });
    }
    if (!updatedData.name) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a valid name" });

    }
    if (typeof updatedData.name != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a name in string format" });
    }
    if (!updatedData.website) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a valid website" });
    }
    if (typeof updatedData.website != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a website in string" });
    }
    if (!updatedData.service) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a valid service name" });
    }
    if (typeof updatedData.service != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a service name in string" });
    }
    if (!updatedData.address) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a valid address" });
    }
    if (typeof updatedData.address != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a address in string" });
    }
    if (!updatedData.city) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a city name" });
    }
    if (typeof updatedData.city != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a city name in string" });
    }
    if (!updatedData.state) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a state" });
    }
    if (typeof updatedData.state != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a state name in string" });
    }
    if (!updatedData.zip) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a zip code" });
    }
    if (typeof updatedData.zip != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a zip code in string" });
    }
    if (!updatedData.longitude) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a valid longitude" });
    }
    if (typeof updatedData.longitude != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a longitude in string" });
    }
    if (!updatedData.latitude) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a valid latitude" });

    }
    if (typeof updatedData.latitude != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please provide a latitude in string" });
    }


    if (!updatedData.name || !updatedData.website || !updatedData.service || !updatedData.address || !updatedData.city || !updatedData.state || !updatedData.zip || !updatedData.longitude || !updatedData.latitude) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Please enter all the fields" });
    }


    var subStringHttp = "http://www."
    var subStringCom = ".com"
    if (subStringHttp == updatedData.website.substr(0, subStringHttp.length)) {
        if (subStringCom == updatedData.website.substr((updatedData.website.length - 4), subStringCom.length)) {
            var strLength = updatedData.website.length - (subStringHttp.length + subStringCom.length)
            if (strLength >= 5) {
                console.log("valid url")
            } else {
                errorcode = true;
                res.status(400);
                return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Entered url should have atleast 5 char" });
            }
        } else {
            errorcode = true;
            res.status(400);
            return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Entered url should end with .com" });
        }
    } else {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Entered url should start with http://www." });
    }


    try {
        console.log(await salonsData.get(req.params.salonId));
    } catch (e) {
        res.status(400).json({ error: e });
        return;
    }

    try {
        const updatedSalon = await salonsData.update(req.params.salonId, updatedData.name, updatedData.website, updatedData.service, updatedData.address, updatedData.city, updatedData.state, updatedData.zip, updatedData.longitude, updatedData.latitude);
        res.render('salons/message', { message: "Updated successfully", updatedSalon: updatedSalon });
    } catch (e) {
        res.status(400).render("salons/error", { error: e });
    }
});


router.get('/salons/:salonId/edit', async(req, res) => {
    let errorcode = false;
    const errors = [];
    if (!req.session.AuthCookie) {
        res.status(400).redirect("/");
    }
    if (!req.params.salonId) {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "should provide valid salons Id" });
    }
    if (typeof req.params.salonId != 'string') {
        errorcode = true;
        res.status(400);
        return res.render("salons/editsalon", { errorcode: errorcode, errors: errors, message: "Id should be in string" });
    }
    try {
        let salonsId = await salonsData.get(req.params.salonId);
        res.status(200).render("salons/editsalon", { salonId: salonsId._id, name: salonsId.name, website: salonsId.website, service: salonsId.service, address: salonsId.address, city: salonsId.city, state: salonsId.state, zip: salonsId.zip, rating: salonsId.rating, covidRating: salonsId.covidRating, longitude: salonsId.longitude, latitude: salonsId.latitude });
    } catch (e) {
        res.status(404).render("salons/error", { error: e });
    }
});


router.post('/search', async(req, res) => {
    try {
        var demo = req.body;
        demo.name = xss(demo.name)

        const data = await salonsData.getSalonViaSearch(demo.name);
        console.log("data", data)
        var demo1 = {}
        for (var i = 0; i < data.length; i++) {
            demo1[i] = data[i]
        }
        var test = Object.values(demo1)
        console.log(test)
        res.render('salons/searchterm', { data: test, demo });
    } catch (error) {
        var errorDescription = {
            className: "No name supplied",
            message: `No name was supplied *******`,
            hasErrors: "Error",
            title: "Salon Found"
        }
        res.status(400).render("salons/error", errorDescription)
    }
});

module.exports = router;