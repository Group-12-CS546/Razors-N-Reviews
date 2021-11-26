const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const commentsData = data.comments;
const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;

// console.log(customersData)
const main = async() => {
    
   
    // await db.dropDatabase();

    // const user1 = await customersData.createUser("firstname","lastname","email","username","password","profilePicture","city","state","age");
    // console.log('************* User has been Added **********************');
    // console.log(user1);
    // console.log('************* User has been Added **********************');
    // console.log('----------------------------------------------------------')
    // const user2 = await customersData.createUser("firstname","lastname","email","username2","password","profilePicture","city","state","age");
    // console.log('************* User has been Added **********************');
    // console.log(user2);
    // console.log('************* User has been Added **********************');
    // console.log('----------------------------------------------------------')
    const user_all = await customersData.getAllCustomers();
    console.log('***-------List of all users starts------********');
    console.log(user_all);
    console.log('***-------List of all users ends------********');

    console.log('****-----------Get customer by id starts----------------***')
    const user_id = await customersData.getCustomerById("61a16e744791b11af88ab973");
    console.log(user_id);
    console.log('****-----------Get customer by id ends----------------***')
        /*
        ************* Firstname validation **********************
        */   
    


    const db = await dbConnection();
    await db.serverConfig.close();
    console.log('**********************')
    console.log('Done seeding database');
    console.log('**********************')

};


main().catch((error) => {
    console.log(error);
});



