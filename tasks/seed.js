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

    // const user1 = await customersData.createUser("firstname","lastname","email","username","password","profilePicture","city","state","age");
    // console.log('************* User has been Added **********************');
    // console.log(user1);
    // console.log('************* User has been Added **********************');
    // console.log('----------------------------------------------------------')
    const user3 = await customersData.createUser("hello","Hello","EMail@email.com","username88855","password","profilePicture","city","state","age");
    console.log('************* User has been Added **********************');
    console.log(user3);
    // console.log('************* User has been Added **********************');
    // console.log('----------------------------------------------------------')
    // const user_all = await customersData.getAllCustomers();
    
    // console.log('***-------List of all users starts------********');
    // console.log(user_all);
    // console.log('***-------List of all users ends------********');

    // console.log('****-----------Get customer by id starts----------------***')

    // const user_id = await customersData.getCustomerById("61a16e744791b11af88ab973");
    // console.log(typeof(user_id._id))
    // console.log(user_id);

    console.log('****-----------Get customer by id ends----------------***')
        

    const safrronLounge = await salonsData.create("The Saffron Lounge", "http://www.saffronlounge.com", ["Makeup"], "New York City, New York", "New York", " NJ", "08820", 40.732628, -74.037628);
    console.log(safrronLounge);
    console.log('safrronLounge salon has been added successfully!');


        /*
        ************* Firstname validation **********************
        */   
    

        const test1 = await reviewsData.create(safrronLounge._id,user3._id, 'This is amazing', 9)
        console.log(test1)
        console.log('Reviews added successfully')

        console.log('**********************')
        console.log('Done seeding database');
        console.log('**********************')
        await db.serverConfig.close();

};


main().catch((error) => {
    console.log(error);
});



