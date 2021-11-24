const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const commentsData = data.comments;
const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;

// console.log(customersData)
const main = async() => {
    
    const db = await dbConnection();
    await db.dropDatabase();

    const user1 = await customersData.createUser("firstname","lastname","email","username","password","profilePicture","city","state","age");
    console.log('************* User has been Added **********************');
    console.log(user1);
    console.log('************* User has been Added **********************');
    console.log('----------------------------------------------------------')
    const user2 = await customersData.createUser("firstname","lastname","email","username","password","profilePicture","city","state","age");
    console.log('************* User has been Added **********************');
    console.log(user2);
    console.log('************* User has been Added **********************');
    const user_all = await customersData.getAllCustomers();
    console.log('*************List of all users**********************');
    console.log(user_all);
        /*
        ************* Firstname validation **********************
        */   
    
    console.log('**********************')
    console.log('Done seeding database');
    console.log('**********************')

    await db.serverConfig.close();

};


main().catch((error) => {
    console.log(error);
});



