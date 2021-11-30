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
 
router.get('/salons/:salonId', async(req, res) => {
    if (!req.params.salonId) {
        res.status(400).json({ error: "should provide valid salons Id" });
        return;
    }
    if (typeof req.params.salonId != 'string') {
        res.status(400).json({ message: 'Id should be in string' })
    }
    try {
        let salonsId = await salonsData.get(req.params.salonId);
        res.status(200).json(salonsId);
    } catch (e) {
        res.status(404).json({ error: 'Salon not found' });
    }
});
 
router.post('/salons', async(req, res) => {
    let salonInfo = req.body;
 
    if (!salonInfo) {
        res.status(400).json({ error: 'You must provide proper data to create a salon' });
        return;
    }
    if (!salonInfo.name) {
        res.status(400).json({ error: 'You must provide a name' });
        return;
    }
    if (typeof salonInfo.name != 'string') {
        res.status(400).json({ message: 'Salon name should be in string' });
        return;
    }
    if (!salonInfo.website) {
        res.status(400).json({ error: 'You must provide a website' });
        return;
    }
    if (typeof salonInfo.website != 'string') {
        res.status(400).json({ message: 'Salon website should be in string' });
        return;
    }
    if (!salonInfo.service) {
        res.status(400).json({ error: 'You must provide a service' });
        return;
    }
    if (!Array.isArray(salonInfo.service)) {
        res.status(400).json({ error: "service should be an array" });
        return;
    }
    if (!salonInfo.address) {
        res.status(400).json({ error: 'You must provide a address' });
        return;
    }
    if (typeof salonInfo.address != 'string') {
        res.status(400).json({ message: 'Salon address should be in string' });
        return;
    }
    if (!salonInfo.city) {
        res.status(400).json({ error: 'You must provide a city' });
        return;
    }
    if (typeof salonInfo.city != 'string') {
        res.status(400).json({ message: 'Salon city should be in string' });
        return;
    }
    if (!salonInfo.state) {
        res.status(400).json({ error: 'You must provide a state' });
        return;
    }
    if (typeof salonInfo.state != 'string') {
        res.status(400).json({ message: 'Salon stste should be in string' });
        return;
    }
    if (!salonInfo.zip) {
        res.status(400).json({ error: 'You must provide a zip' });
        return;
    }
    if (typeof salonInfo.zip != 'string') {
        res.status(400).json({ message: 'Salon zip should be in string' });
        return;
    }
    if (!salonInfo.longitude) {
        res.status(400).json({ error: 'You must provide a longitude' });
        return;
    }
    if (typeof salonInfo.longitude != 'number') {
        res.status(400).json({ message: 'Salon longitute should be in number' });
        return;
    }
    if (!salonInfo.latitude) {
        res.status(400).json({ error: 'You must provide a latitude' });
        return;
    }
    if (typeof salonInfo.latitude != 'number') {
        res.status(400).json({ message: 'Salon latitude should be in number' });
        return;
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
        console.log("newSalon",newSalon)
        res.status(200).json(newSalon);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});
 
router.delete('/salons/:salonId', async(req, res) => {
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
        res.status(404).json({ error: 'Salon not found' });
        return;
    }
    try {
        const getSalonId = await salonsData.get(req.params.salonId);
        await salonsData.remove(req.params.salonId);
        res.status(200).json({ getSalonId: getSalonId._id, deleted: true });
    } catch (e) {
        res.status(404).json({ error: 'Salon not deleted properly' });
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
        res.status(404).json({ error: 'salon not found' });
        return;
    }
 
    try {
        const updatedSalon = await salonsData.update(req.params.salonId, updatedData.name, updatedData.website, updatedData.service, updatedData.address, updatedData.city, updatedData.state, updatedData.zip, updatedData.longitude, updatedData.latitude);
        res.status(200).json(updatedSalon);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});
 
module.exports = router;
