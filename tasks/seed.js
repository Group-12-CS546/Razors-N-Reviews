const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const commentsData = data.comments;
const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;

const main = async() => {

    const db = await dbConnection();
    await db.dropDatabase();

    console.log('Done seeding database');

    await db.serverConfig.close();

};

main().catch((error) => {
    console.log(error);
});