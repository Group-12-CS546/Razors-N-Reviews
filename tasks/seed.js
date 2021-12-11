const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
// const commentsData = data.comments;
// const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;

const main = async() => {

    const db = await dbConnection();
    // await db.dropDatabase();

    const skyLounge = await salonsData.create("The lounge", "http://www.skylounge.com", "Spa", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628");
    console.log(skyLounge);
    console.log('skyLounge salon has been added successfully!');

    // const skyLounge = await salonsData.creae("The Sky Lounge", "http://www.skylounge.com", "Spa", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628");
    // console.log(skyLounge);
    // console.log('skyLounge salon has been added successfully!');
    // const safrronLounge1 = await salonsData.create("The Saffron Lounge1", "http://www.saffronlounge.com", ["Makeup"], "New York City, New York", "New York", " NJ", "08820", 40.732628, -74.037628);
    // console.log(safrronLounge1);
    // console.log('safrronLounge salon has been added successfully!');

    // const searchSalon = await salonsData.getSalonViaSearch("Makeup");
    // console.log("searchSalon", searchSalon)


    // const timeLaunge = await salonsData.create("The TimeIndia Lounge", "http://www.timeindialaunge.com", ["Makeup", "Hair"], "324 Central Ave", "Jersey City", "NJ", "07307", 40.7459498, -74.0512955);
    // console.log(timeLaunge);
    // console.log('timeLaunge salon has been added successfully!');

    // const getAllSalons = await salonsData.getAll();
    // console.log('The List of Restaurants are:');
    // console.log(getAllSalons);

    // const getSalonId = await salonsData.get(safrronLounge._id);
    // console.log("The Salon Id is:", getSalonId);

    // // const getSpecificSalonId = await salonsData.get(timeLaunge._id)
    // // await salonsData.remove(timeLaunge._id)
    // // console.log("The deleted Id is:",getSpecificSalonId.name);   

    const updateSalon = await salonsData.update(skyLounge._id, "The sky lounge*****", "http://www.skylounge.com", "Spa", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628")
    console.log(updateSalon);
    console.log('salon has been updated successfully!');

    // const user1 = await customersData.createUser("savleen", "lastname", "email", "savleen", "password", "profilePicture", "city", "state", "age");
    // console.log('************* User has been Added **********************');
    // console.log(user1);
    // console.log(user1._id, 'ID of user1')

    // const test1 = await reviewsData.create(safrronLounge._id, user1._id, 'This is amazing', 9)
    // console.log(test1)
    // console.log('Reviews added successfully')


    console.log('Done seeding database');

    await db.serverConfig.close();

};

main().catch((error) => {
    console.log(error);
});