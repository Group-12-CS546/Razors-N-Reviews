const express = require('express');
const router = express.Router();
const data = require('../data');
const salonsData = data.salons;

router.get('/salons', async(req, res) => {
    try {
        const salonsList = await salonsData.getAll();
        res.status(200).json(salonsList)
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.get('/salons/:id', async(req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "should provide valid salons Id" });
        return;
    }
    if (typeof req.params.id != 'string') {
        res.status(400).json({ message: 'Id should be in string' })
    }
    try {
        let salonsId = await salonsData.get(req.params.id);
        res.status(200).json(salonsId);
    } catch (e) {
        res.status(404).json({ error: 'Salon not found' });
    }
});

router.post('/salons', async(req, res) => {
    let salonInfo = req.body;

    if (!salonInfo) {
        res.status(400).json({ error: 'You must provide data to create a salon' });
        return;
    }

    if (!salonInfo.name) {
        res.status(400).json({ error: 'You must provide a name' });
        return;
    }

    if (!salonInfo.website) {
        res.status(400).json({ error: 'You must provide a website' });
        return;
    }

    if (!salonInfo.service) {
        res.status(400).json({ error: 'You must provide a service' });
        return;
    }

    if (!salonInfo.address) {
        res.status(400).json({ error: 'You must provide a address' });
        return;
    }

    if (!salonInfo.city) {
        res.status(400).json({ error: 'You must provide a city' });
        return;
    }

    if (!salonInfo.state) {
        res.status(400).json({ error: 'You must provide a state' });
        return;
    }

    if (!salonInfo.zip) {
        res.status(400).json({ error: 'You must provide a zip' });
        return;
    }

    if (!salonInfo.rating) {
        res.status(400).json({ error: 'You must provide a rating' });
        return;
    }

    if (!salonInfo.covidRating) {
        res.status(400).json({ error: 'You must provide covidRating' });
        return;
    }

    if (!salonInfo.userPassword) {
        res.status(400).json({ error: 'You must provide userPassword' });
        return;
    }

    // if (!Array.isArray(salonInfo.cuisines)) {
    //     res.status(400).json({ error: "cuisines should be an array" });
    //     return;
    // }

    try {
        const newSalon = await salonsData.create(
            salonInfo.website,
            salonInfo.service,
            salonInfo.address,
            salonInfo.city,
            salonInfo.state,
            salonInfo.zip,
            salonInfo.rating,
            salonInfo.covidRating,
            salonInfo.userPassword
        );
        res.status(200).json(newSalon);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.delete('/salons/:id', async(req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "should provide valid salon Id to delete" });
        return;
    }
    if (typeof req.params.id != 'string') {
        res.status(400).json({ message: 'Id should be in string' })
    }
    try {
        await salonsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Salon not found' });
        return;
    }
    try {
        const getSalonId = await salonsData.get(req.params.id);
        await salonsData.remove(req.params.id);
        res.status(200).json({ getSalonId: getSalonId._id, deleted: true });
    } catch (e) {
        res.status(404).json({ error: 'Salon not deleted properly' });
    }
});

router.put('/salons/:id', async(req, res) => {
    const updatedData = req.body;
    console.log("updatedData", updatedData)
    if (!req.params.id) {
        res.status(400).json({ error: "should provide valid Salon Id" });
        return;
    }
    if (typeof req.params.id != 'string') {
        res.status(400).json({ message: 'Id should be in string' })
    }
    if (!updatedData.name || !updatedData.website || !updatedData.service || !updatedData.address || !updatedData.city || !updatedData.state || !updatedData.zip || !updatedData.rating || !updatedData.covidRating || !updatedData.userPassword) {
        res.status(400).json({ error: 'You must Supply All fields' });
        return;
    }
    try {
        console.log(await salonsData.get(req.params.id));
    } catch (e) {
        res.status(404).json({ error: 'salon not found' });
        return;
    }

    try {
        const updatedSalon = await salonsData.update(req.params.id, updatedData.name, updatedData.website, updatedData.service, updatedData.address, updatedData.city, updatedData.state, updatedData.zip, updatedData.rating, updatedData.covidRating, updatedData.userPassword);
        res.status(200).json(updatedSalon);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;