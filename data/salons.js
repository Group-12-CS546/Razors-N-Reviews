const mongoCollections = require('../config/mongoCollections');
const salons = mongoCollections.salons;
let { ObjectId } = require('mongodb');
 
const create = async function create(name, website, service, address, city, state, zip, rating, covidRating, userPassword) {
    if (!name) throw 'You must provide a name for your salon';
    if (!website) throw 'You must provide a website for your salon';
    if (!service) throw 'You must provide a service for your salon';
    if (!address) throw 'You must provide a address for your salon';
    if (!city) throw 'You must provide a city for your salon';
    if (!state) throw 'You must provide a state for your salon';
    if (!zip) throw 'You must provide a zip for your salon';
    if (!rating) throw 'You must provide a rating for your salon';
    if (!covidRating) throw 'You must provide a covidRating for your salon';
    if (!userPassword) throw 'You must provide a userPassword for your salon';
 
    //To check name is null or empty
    if (name.length == 0) {
        throw 'Name cannot be null or empty'
    }
    //To check name is string
    if (typeof name != 'string') {
        throw 'The entered name must be a string'
    }
    //To check service is null or empty
    if (service.length == 0) {
        throw 'service cannot be null or empty'
    }
    //To check service is string
    if (typeof service != 'string') {
        throw 'The entered service must be a string'
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
    //To check rating is null or empty
    if (rating.length == 0) {
        throw 'rating cannot be null or empty'
    }
    //To check rating is string
    if (typeof rating != 'number') {
        throw 'The entered rating must be a string'
    }
    //To check covidRating is null or empty
    if (covidRating.length == 0) {
        throw 'covidRating cannot be null or empty'
    }
    //To check covidRating is string
    if (typeof covidRating != 'number') {
        throw 'The entered covidRating must be a string'
    }
 
    //To check userPassword is null or empty
    if (userPassword.length == 0) {
        throw 'userPassword cannot be null or empty'
    }
    //To check userPassword is string
    if (typeof userPassword != 'string') {
        throw 'The entered userPassword must be a string'
    }
 
    //To check website is null or empty
    if (website.length == 0) {
        throw 'website cannot be null or empty'
    }
    //To check website is string
    if (typeof website != 'string') {
        throw 'The entered website must be a string'
    }
 
    if (rating < '0' || rating > '5') {
        throw 'rating should be within valid range from 0 to 5'
    }
 
    if (covidRating < '0' || covidRating > '5') {
        throw 'covidRating should be within valid range from 0 to 5'
    }
 
    // if (cuisines.length === 0) throw 'You must provide at least one cuisines.';
 
    // if (!cuisines || !Array.isArray(cuisines))
    //     throw 'You must provide an array of cuisines';
 
    // for (var k = 0; k < cuisines.length; k++) {
    //     if (typeof cuisines[k] != 'string') {
    //         throw 'Cuisines should be string'
    //     }
    // }
 
    // if (typeof serviceOptions.dineIn != 'boolean' || typeof serviceOptions.takeOut != 'boolean' || typeof serviceOptions.delivery != 'boolean') {
    //     throw 'ServiceOptions.dineIn, serviceOptions.takeOut, serviceOptions.delivery should be boolean'
    // }
    // if (name.trim().length == 0) {
    //     throw "name cannot have spaces"
    // }
    // if (location.trim().length == 0) {
    //     throw "location cannot have spaces"
    // }
    // if (phoneNumber.trim().length == 0) {
    //     throw "phoneNumber cannot have spaces"
    // }
    // if (website.trim().length == 0) {
    //     throw "website cannot have spaces"
    // }
    // if (priceRange.trim().length == 0) {
    //     throw "priceRange cannot have spaces"
    // }
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
 
    var userPasswordLowerCase = userPassword.toLowerCase();
 
    let newsalons = {
        name: name,
        website: website,
        service: service,
        address: address,
        city: city,
        state: state,
        zip: zip,
        rating: rating,
        covidRating: covidRating,
        userPassword: userPasswordLowerCase,
        reviewId: []
    };
 
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
        throw `Could not delete restaurant with id of ${salonId}`;
    }
    return { deleted: true };
}
 
const update = async function update(salonId, name, website, service, address, city, state, zip, rating, covidRating) {
 
    if (!name) throw 'You must provide a name for your salon';
    if (!website) throw 'You must provide a website for your salon';
    if (!service) throw 'You must provide a service for your salon';
    if (!address) throw 'You must provide a address for your salon';
    if (!city) throw 'You must provide a city for your salon';
    if (!state) throw 'You must provide a state for your salon';
    if (!zip) throw 'You must provide a zip for your salon';
    if (!rating) throw 'You must provide a rating for your salon';
    if (!covidRating) throw 'You must provide a covidRating for your salon';
    if (!userPassword) throw 'You must provide a userPassword for your salon';
 
    //To check name is null or empty
    if (name.length == 0) {
        throw 'Name cannot be null or empty'
    }
    //To check name is string
    if (typeof name != 'string') {
        throw 'The entered name must be a string'
    }
    //To check service is null or empty
    if (service.length == 0) {
        throw 'service cannot be null or empty'
    }
    //To check service is string
    if (typeof service != 'string') {
        throw 'The entered service must be a string'
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
    //To check rating is null or empty
    if (rating.length == 0) {
        throw 'rating cannot be null or empty'
    }
    //To check rating is string
    if (typeof rating != 'number') {
        throw 'The entered rating must be a string'
    }
    //To check covidRating is null or empty
    if (covidRating.length == 0) {
        throw 'covidRating cannot be null or empty'
    }
    //To check covidRating is string
    if (typeof covidRating != 'number') {
        throw 'The entered covidRating must be a string'
    }
 
    //To check userPassword is null or empty
    if (userPassword.length == 0) {
        throw 'userPassword cannot be null or empty'
    }
    //To check userPassword is string
    if (typeof userPassword != 'number') {
        throw 'The entered userPassword must be a string'
    }
 
    //To check website is null or empty
    if (website.length == 0) {
        throw 'website cannot be null or empty'
    }
    //To check website is string
    if (typeof website != 'string') {
        throw 'The entered website must be a string'
    }
 
    if (rating < '0' || rating > '5') {
        throw 'rating should be within valid range from 0 to 5'
    }
 
    if (covidRating < '0' || covidRating > '5') {
        throw 'covidRating should be within valid range from 0 to 5'
    }
 
    // if (cuisines.length === 0) throw 'You must provide at least one cuisines.';
 
    // if (!cuisines || !Array.isArray(cuisines))
    //     throw 'You must provide an array of cuisines';
 
    // for (var k = 0; k < cuisines.length; k++) {
    //     if (typeof cuisines[k] != 'string') {
    //         throw 'Cuisines should be string'
    //     }
    // }
 
    // if (typeof serviceOptions.dineIn != 'boolean' || typeof serviceOptions.takeOut != 'boolean' || typeof serviceOptions.delivery != 'boolean') {
    //     throw 'ServiceOptions.dineIn, serviceOptions.takeOut, serviceOptions.delivery should be boolean'
    // }
    // if (name.trim().length == 0) {
    //     throw "name cannot have spaces"
    // }
    // if (location.trim().length == 0) {
    //     throw "location cannot have spaces"
    // }
    // if (phoneNumber.trim().length == 0) {
    //     throw "phoneNumber cannot have spaces"
    // }
    // if (website.trim().length == 0) {
    //     throw "website cannot have spaces"
    // }
    // if (priceRange.trim().length == 0) {
    //     throw "priceRange cannot have spaces"
    // }
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
        rating: rating,
        covidRating: covidRating,
    };
 
    const updateSalonInfo = await salonCollection.updateOne({ _id: parsedId }, { $set: updatedSalonInfo }, );
 
    if (!updateSalonInfo.matchedCount && !updateSalonInfo.modifiedCount)
        throw 'Update failed';
 
    var getParsedID = await this.get(salonId);
    const objCmp = JSON.parse(JSON.stringify(getParsedID));
    return objCmp;
}
 
module.exports = {
    create,
    get,
    getAll,
    remove,
    update
}

