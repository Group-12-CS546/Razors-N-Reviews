const express = require('express');
const router = express.Router();
const data = require('../data');
const salonsData = data.salons;
const reviewsData = data.reviews;

router.get('/salons', async(req, res) => {
    try {
        const salonsList = await salonsData.getAll();
        // res.status(200).json(salonsList)
        console.log("salonsList***", salonsList)
            // res.status(200).json(salonsList);
        res.status(200).render("salons/list", { salonsList });
    } catch (e) {
        // res.status(404).json({ error: e });
        res.status(200).render("salons/error", { error: e });
    }
});

router.get('/salons/:salonId', async(req, res) => {
    console.log("salon if to print*************************", req.params.salonId);
    // if (!req.params.salonId) {
    //     res.status(400).json({ error: "should provide valid salons Id" });
    //     return;
    // }
    // if (typeof req.params.salonId != 'string') {
    //     res.status(400).json({ error: 'Id should be in string' })
    // }
    try {
        let salonsId = await salonsData.get(req.params.salonId);
        console.log("salonsId", salonsId)
            // res.status(200).json(salonsId);
        let getReviews = await reviewsData.getAllreviewsofSalon(req.params.salonId)
        console.log("getReviews", getReviews)

        res.status(200).render("salons/salonprofile", { salonId: salonsId._id, name: salonsId.name, website: salonsId.website, service: salonsId.service, address: salonsId.address, city: salonsId.city, state: salonsId.state, zip: salonsId.zip, rating: salonsId.rating, covidRating: salonsId.covidRating, longitude: salonsId.longitude, latitude: salonsId.latitude, getReviews: getReviews });
    } catch (e) {
        console.log("e**", e)
        res.status(404).json({ error: "not found**********" });
    }
});

router.get("/manage", async(req, res) => {
    if (!req.session.AuthCookie) {
        res.status(401).redirect("/salons");
    }
    try {
        const salonsList = await salonsData.getAll();
        // console.log("salonsList***", salonsList)
        // const userLoggedIn = (req.session.AuthCookie) ? true : false;
        // res.status(200).render("", { restaurants: restaurantList, userLoggedIn: true })
        res.status(200).render("salons/salonsignup", { message: "You have p", salonsList: salonsList });
    } catch (e) {
        console.log(e);
        // res.status(200).render("management", { restaurants: [], userLoggedIn: true })
    }
    // }
});

router.get("/manage", (req, res) => {
    console.log("req.session.AuthCookie*********", req.session.AuthCookie)
    if (!req.session.AuthCookie)
    // res.render("users/login", { title: "Login", heading: "Login" });
        res.redirect("salons/salonsignup", { title: "Login", heading: "Login" });
    else
        res.redirect("/manage");
});


router.post('/post', async(req, res) => {
    let salonInfo = req.body;
    console.log("salonInfo*********", salonInfo)
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
    // if (!Array.isArray(salonInfo.service)) {
    //     res.status(400).json({ error: "service should be an array" });
    //     return;
    // }
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
    if (typeof salonInfo.longitude != 'number') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a longitude in number format" });
    }
    if (!salonInfo.latitude) {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a valid latitude" });

    }
    if (typeof salonInfo.latitude != 'number') {
        errorcode = true;
        res.status(400);
        return res.render("salons/salonsignup", { errorcode: errorcode, errors: errors, message: "Please provide a latitude in number format" });
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
            // res.status(200).json(newSalon);
        res.status(200).json({ message: "You have successfully created new salon" });
        res.redirect("/manage");
    } catch (e) {
        res.status(404).json({ error: e });
        res.status(404).render("salons/error", { message: "not created", error: e });
    }
});

router.get('/salons/:salonId/delete', async(req, res) => {
    console.log("*delete********", req.params.salonId)
    if (!req.params.salonId) {
        res.status(400).json({ error: "should provide valid salon Id to delete" });
        return;
    }
    if (typeof req.params.salonId != 'string') {
        res.status(400).json({ message: 'Salon ID should be in string' })
    }
    try {
        await salonsData.get(req.params.salonId);
    } catch (e) {
        res.status(404).json({ error: 'Salon not found11111' });
        return;
    }
    try {
        // const getSalonId = await salonsData.get(req.params.salonId);
        deleteSalon = await salonsData.remove(req.params.salonId);
        // res.status(200).json({ getSalonId: getSalonId._id, deleted: true });
        if (deleteSalon) {
            return res.render("salons/delete", { message: "deleted" });
            // res.status(200).json({ getSalonId: getSalonId._id, deleted: true });
        } else {
            res.status(400).render("salons/error", { error: 'not deleted' });
        }
    } catch (e) {
        res.status(404).render("salons/error", { error: e });
    }
});

router.put('/salons/:salonId', async(req, res) => {
    const updatedData = req.body;
    console.log("updatedData", updatedData)
    if (!req.params.salonId) {
        res.status(400).json({ error: "should provide valid Salon Id" });
        return;
    }
    if (typeof req.params.salonId != 'string') {
        res.status(400).json({ message: 'Id should be in string' })
    }
    if (!updatedData.name || !updatedData.website || !updatedData.service || !updatedData.address || !updatedData.city || !updatedData.state || !updatedData.zip || !updatedData.longitude || !updatedData.latitude) {
        res.status(400).json({ error: 'You must Supply All fields' });
        return;
    }
    try {
        console.log(await salonsData.get(req.params.salonId));
    } catch (e) {
        res.status(404).json({ error: 'salon not found222222222' });
        return;
    }

    try {
        const updatedSalon = await salonsData.update(req.params.salonId, updatedData.name, updatedData.website, updatedData.service, updatedData.address, updatedData.city, updatedData.state, updatedData.zip, updatedData.longitude, updatedData.latitude);
        res.status(200).json(updatedSalon);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/search', async(req, res) => {
    try {
        const demo = req.body;
        console.log("demo***********", demo);
        // if (demo.name == null || demo.name.length == 0) {
        //     errorDescription = {
        //         className: "No name supplied",
        //         message: `No name was supplied`,
        //         hasErrors: "Error",
        //         title: "Salon Found"
        //     }
        //     res.status(400).render("salons/error", errorDescription);
        //     return;
        // }
        // const searchURL = baseUrl + '?nameStartsWith=' + demo.title + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

        const data = await salonsData.getSalonViaSearch(demo.name);
        console.log("data", data)
            // var demo1 = {}
            // for (var i = 0; i < data.length; i++) {
            //     demo1 = data[i]
            // }
            // for (var i of data) {
            //     console.log({ i })
            // }
            // console.log("demo1*****", demo1);
            // res.status(200).json(data);
        var demo1 = {}
        for (var i = 0; i < data.length; i++) {
            demo1[i] = data[i]
            console.log("demo3333333333333", demo1[i])
        }
        console.log("demo111111111", demo1)
        var test = Object.values(demo1)
        console.log(test)
        res.render('salons/searchterm', { data: test, demo });
    } catch (error) {
        errorDescription = {
            className: "No name supplied",
            message: `No name was supplied *******`,
            hasErrors: "Error",
            title: "Salon Found"
        }
        res.status(400).render("salons/error", errorDescription)
            // res.status(404).json({ error: errorDescription });
    }
});

module.exports = router;