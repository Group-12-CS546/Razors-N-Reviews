const mongoCollections = require('../config/mongoCollections');
const salons = mongoCollections.salons;
let { ObjectId } = require('mongodb');

const create = async function create(name, website, service, address, city, state, zip, longitude, latitude) {
    if (!name) throw 'You must provide a name for your salon';
    if (!website) throw 'You must provide a website for your salon';
    if (!service) throw 'You must provide a service for your salon';
    if (!address) throw 'You must provide a address for your salon';
    if (!city) throw 'You must provide a city for your salon';
    if (!state) throw 'You must provide a state for your salon';
    if (!zip) throw 'You must provide a zip for your salon';
    if (!longitude) throw 'You must provide a longitude for your salon';
    if (!latitude) throw 'You must provide a latitude for your salon';

    //To check name is null or empty
    if (name.length == 0) {
        throw 'Name cannot be null or empty'
    }
    //To check name is string
    if (typeof name != 'string') {
        throw 'The entered name must be a string'
    }
    //To check address is null or empty
    if (address.length == 0) {
        throw 'address cannot be null or empty'
    }
    //To check address is string
    if (typeof address != 'string') {
        throw 'The entered address must be a string'
    }
    //To check city is null or empty
    if (city.length == 0) {
        throw 'city cannot be null or empty'
    }
    //To check city is string
    if (typeof city != 'string') {
        throw 'The entered city must be a string'
    }
    //To check state is null or empty
    if (state.length == 0) {
        throw 'state cannot be null or empty'
    }
    //To check state is string
    if (typeof state != 'string') {
        throw 'The entered state must be a string'
    }
    //To check zip is null or empty
    if (zip.length == 0) {
        throw 'stzipate cannot be null or empty'
    }
    //To check zip is string
    if (typeof zip != 'string') {
        throw 'The entered zip must be a string'
    }
    //To check longitude is null or empty
    if (longitude.length == 0) {
        throw 'longitude cannot be null or empty'
    }
    //To check longitude is string
    // if (typeof longitude != 'number') {
    //     throw 'The entered longitude must be a number'
    // }
    // if (!isNaN(longitude % 1) && longitude % 1 !== 0) {
    //     throw 'The entered longitude must be a number'
    // }

    var decimal = /^[-+]?[0-9]+\.[0-9]+$/;

    if (!longitude.match(decimal)) {
        // alert('Please enter valid float');
        throw 'The entered longitude must be a float'
    }

    if (!latitude.match(decimal)) {
        // alert('Please enter valid float');
        throw 'The entered latitude must be a float'
    }

    //To check latitude is null or empty
    if (latitude.length == 0) {
        throw 'latitude cannot be null or empty'
    }
    //To check latitude is string
    // if (typeof latitude != 'number') {
    //     throw 'The entered latitude must be a number'
    // }

    // if (!isNaN(latitude % 1) && latitude % 1 !== 0) {
    //     throw 'The entered latitude must be a number'
    // }

    //To check website is null or empty
    if (website.length == 0) {
        throw 'website cannot be null or empty'
    }
    //To check website is string
    if (typeof website != 'string') {
        throw 'The entered website must be a string'
    }

    if (service.length === 0) throw 'You must provide at least one service.';

    // if (!service || !Array.isArray(service))
    //     throw 'You must provide an array of service';

    for (var k = 0; k < service.length; k++) {
        if (typeof service[k] != 'string') {
            throw 'service should be string'
        }
    }
    if (name.trim().length == 0) {
        throw "name cannot have spaces"
    }
    if (website.trim().length == 0) {
        throw "website cannot have spaces"
    }
    if (address.trim().length == 0) {
        throw "address cannot have spaces"
    }
    if (city.trim().length == 0) {
        throw "city cannot have spaces"
    }
    if (state.trim().length == 0) {
        throw "state cannot have spaces"
    }
    if (zip.trim().length == 0) {
        throw "zip cannot have spaces"
    }
    var subStringHttp = "http://www."
    var subStringCom = ".com"
    if (subStringHttp == website.substr(0, subStringHttp.length)) {
        if (subStringCom == website.substr((website.length - 4), subStringCom.length)) {
            var strLength = website.length - (subStringHttp.length + subStringCom.length)
            if (strLength >= 5) {
                console.log("valid url")
            } else {
                throw 'Entered url should have atleast 5 char'
            }
        } else {
            throw 'Entered url should end with .com'
        }
    } else {
        throw 'Entered url should start with http://www.'
    }

    const salonsCollection = await salons();

    let newsalons = {
        name: name,
        website: website,
        service: [service],
        address: address,
        city: city,
        state: state,
        zip: zip,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        rating: 0,
        covidRating: 0,
        reviewId: []
    };

    // const salonAvailable = await salonsCollection.findOne({ name: newsalons.name });
    // if (salonAvailable) throw "salon name already in use";

    const allSalons = await this.getAll();
    allSalons.forEach(element => {
        for (var i = 0; i < element.name.length; i++) {
            if (element.name === name) {
                throw "Salon name already in use"
            }
        }
    });
    const insertInfo = await salonsCollection.insertOne(newsalons);
    if (insertInfo.insertedCount === 0) throw 'Could not add salons';

    const newId = insertInfo.insertedId;
    const salon = await this.get(newId.toString());
    return JSON.parse(JSON.stringify(salon));
}

const get = async function get(salonId) {
    if (!salonId) throw 'You must provide an salonId to search for';
    if (salonId.length == 0) {
        throw "salonId cannot be null or empty"
    }
    if (typeof salonId != 'string') {
        throw 'Entered salonId should be string'
    }
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) {
        throw 'Not valid ObjectID'
    }
    let x = newObjId.toString();

    let parsedId = ObjectId(salonId);

    const salonCollection = await salons();
    const salonDetails = await salonCollection.findOne({ _id: parsedId });
    if (salonDetails === null) throw 'No salon found with that id';

    return JSON.parse(JSON.stringify(salonDetails));
}

const getAll = async function getAll() {
    const salonCollection = await salons();

    const salonList = await salonCollection.find({}).toArray();
    return JSON.parse(JSON.stringify(salonList));
}

const remove = async function remove(salonId) {
    if (!salonId) throw 'You must provide an salonId to search for';
    if (salonId.length == 0) {
        throw 'Entered salonId cannot be empty'
    }
    if (typeof salonId != 'string') {
        throw 'Entered salonId should be string'
    }
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) {
        throw 'Not valid ObjectID'
    }
    let x = newObjId.toString();
    let parsedId = ObjectId(salonId);

    const salonCollection = await salons();
    const deletionInfo = await salonCollection.deleteOne({ _id: parsedId });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete salon with id of ${salonId}`;
    }
    return { deleted: true };
}

const update = async function update(salonId, name, website, service, address, city, state, zip, longitude, latitude) {

    if (!name) throw 'You must provide a name for your salon';
    if (!website) throw 'You must provide a website for your salon';
    if (!service) throw 'You must provide a service for your salon';
    if (!address) throw 'You must provide a address for your salon';
    if (!city) throw 'You must provide a city for your salon';
    if (!state) throw 'You must provide a state for your salon';
    if (!zip) throw 'You must provide a zip for your salon';
    if (!longitude) throw 'You must provide a longitude for your salon';
    if (!latitude) throw 'You must provide a latitude for your salon';

    //To check name is null or empty
    if (name.length == 0) {
        throw 'Name cannot be null or empty'
    }
    //To check name is string
    if (typeof name != 'string') {
        throw 'The entered name must be a string'
    }
    //To check address is null or empty
    if (address.length == 0) {
        throw 'address cannot be null or empty'
    }
    //To check address is string
    if (typeof address != 'string') {
        throw 'The entered address must be a string'
    }
    //To check city is null or empty
    if (city.length == 0) {
        throw 'city cannot be null or empty'
    }
    //To check city is string
    if (typeof city != 'string') {
        throw 'The entered city must be a string'
    }
    //To check state is null or empty
    if (state.length == 0) {
        throw 'state cannot be null or empty'
    }
    //To check state is string
    if (typeof state != 'string') {
        throw 'The entered state must be a string'
    }
    //To check zip is null or empty
    if (zip.length == 0) {
        throw 'stzipate cannot be null or empty'
    }
    //To check zip is string
    if (typeof zip != 'string') {
        throw 'The entered zip must be a string'
    }
    //To check longitude is null or empty
    if (longitude.length == 0) {
        throw 'longitude cannot be null or empty'
    }
    //To check longitude is string
    if (typeof longitude != 'number') {
        throw 'The entered longitude must be a number'
    }
    //To check latitude is null or empty
    if (latitude.length == 0) {
        throw 'latitude cannot be null or empty'
    }
    //To check latitude is string
    if (typeof latitude != 'number') {
        throw 'The entered latitude must be a number'
    }
    //To check website is null or empty
    if (website.length == 0) {
        throw 'website cannot be null or empty'
    }
    //To check website is string
    if (typeof website != 'string') {
        throw 'The entered website must be a string'
    }

    if (service.length === 0) throw 'You must provide at least one service.';

    if (!service || !Array.isArray(service))
        throw 'You must provide an array of service';

    for (var k = 0; k < service.length; k++) {
        if (typeof service[k] != 'string') {
            throw 'service should be string'
        }
    }
    if (name.trim().length == 0) {
        throw "name cannot have spaces"
    }
    if (website.trim().length == 0) {
        throw "website cannot have spaces"
    }
    if (address.trim().length == 0) {
        throw "address cannot have spaces"
    }
    if (city.trim().length == 0) {
        throw "city cannot have spaces"
    }
    if (state.trim().length == 0) {
        throw "state cannot have spaces"
    }
    if (zip.trim().length == 0) {
        throw "zip cannot have spaces"
    }
    var subStringHttp = "http://www."
    var subStringCom = ".com"
    if (subStringHttp == website.substr(0, subStringHttp.length)) {
        if (subStringCom == website.substr((website.length - 4), subStringCom.length)) {
            var strLength = website.length - (subStringHttp.length + subStringCom.length)
            if (strLength >= 5) {
                console.log("valid url")
            } else {
                throw 'Entered url should have atleast 5 char'
            }
        } else {
            throw 'Entered url should end with .com'
        }
    } else {
        throw 'Entered url should start with http://www.'
    }

    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) {
        throw 'Not valid ObjectID'
    }
    let x = newObjId.toString();

    let parsedId = ObjectId(salonId);
    if (parsedId === null) throw 'No salon found with that id';

    const salonCollection = await salons();

    const updatedSalonInfo = {
        name: name,
        website: website,
        service: service,
        address: address,
        city: city,
        state: state,
        zip: zip,
        longitude: longitude,
        latitude: latitude
    };

    const updateSalonInfo = await salonCollection.updateOne({ _id: parsedId }, { $set: updatedSalonInfo });

    if (!updateSalonInfo.matchedCount && !updateSalonInfo.modifiedCount)
        throw 'Update failed';

    var getParsedID = await this.get(salonId);
    const objCmp = JSON.parse(JSON.stringify(getParsedID));
    return objCmp;
}


const getSalonViaSearch = async function getSalonViaSearch(search) {
    console.log("search*********", search)
    if (!search) throw "Error (getSalonViaSearch): Must provide search.";
    if (typeof(search) !== "string") throw "Error (getSalonViaSearch): Search must be a string.";
    const salonCollection = await salons();
    console.log("salonCollection***", salonCollection.length)
    const query = new RegExp(search, "i");
    console.log("query", query)
    const salonList = await salonCollection.find({ $or: [{ service: { $regex: query } }, { name: { $regex: query } }] }).toArray();
    console.log("salonList", salonList);
    return salonList;
}

module.exports = {
    create,
    get,
    getAll,
    remove,
    update,
    getSalonViaSearch
}