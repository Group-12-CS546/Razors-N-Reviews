const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
// const commentsData = data.comments;
// const covidReviewsData = data.covidReviews;
// const customersData = data.customers;
// const reviewsData = data.reviews;
const salonsData = data.salons;

const main = async() => {

    const db = await dbConnection();
    await db.dropDatabase();

    const safrronLounge = await salonsData.create("The Saffron Lounge", "http://www.saffronlounge.com", ["Makeup"], "New York City, New York", "New York", " NJ", "08820", 40.732628, -74.037628);
    console.log(safrronLounge);
    console.log('safrronLounge salon has been added successfully!');

    const timeLaunge = await salonsData.create("The TimeIndia Lounge", "http://www.timeindialaunge.com", ["Makeup","Hair"], "324 Central Ave", "Jersey City", "NJ", "07307", 40.7459498, -74.0512955);
    console.log(timeLaunge);
    console.log('timeLaunge salon has been added successfully!');

    const getAllSalons = await salonsData.getAll();
    console.log('The List of Restaurants are:');
    console.log(getAllSalons);

    const getSalonId = await salonsData.get(safrronLounge._id);
    console.log("The Salon Id is:",getSalonId);

    // const getSpecificSalonId = await salonsData.get(timeLaunge._id)
    // await salonsData.remove(timeLaunge._id)
    // console.log("The deleted Id is:",getSpecificSalonId.name);   

    const updateSalon = await salonsData.update(safrronLounge._id,"The Saffron", "http://www.saffronlounge.com", ["Makeup","Hair"], "New York City, New York", "New York", " NJ", "08820", 40.732628, -74.037628) 
    console.log(updateSalon);
    console.log('salon has been updated successfully!');

    console.log('Done seeding database');

    await db.serverConfig.close();

};

main().catch((error) => {
    console.log(error);
});