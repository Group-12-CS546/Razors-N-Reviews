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
    // await db.dropDatabase();

    // const user1 = await customersData.createUser("firstname","lastname","email","username","password","profilePicture","city","state","age");
    // console.log('************* User has been Added **********************');
    // console.log(user1);
    // console.log('************* User has been Added **********************');
    // console.log('----------------------------------------------------------')
    // const user3 = await customersData.createUser("newuser","Hello","EMail@email.com","username","password","profilePicture","city","state","age");
    const user3 = await customersData.updateUser("61af9601f902ca36848981fe",
    
    {
    "username": "newusername11",
    "password": "newusername11",
    "firstname": "Iamnewuser22",
    "lastname": "newusername12",
    "email": "pupr223eti@stevens.edu",
    "city": "Jersey Cityyy",
    "state": "New Jerseyyy",
    "age": "39",
    }
    
    );
    console.log(user3);
    // console.log('************* User has been Added **********************');
    // console.log(user3);
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

    // console.log('****-----------Get customer by id ends----------------***')
        

    // const safrronLounge = await salonsData.create("The Saffron Lounge", "http://www.saffronlounge.com", ["Makeup"], "New York City, New York", "New York", " NJ", "08820", 40.732628, -74.037628);
    // console.log(safrronLounge);
    // console.log('safrronLounge salon has been added successfully!');


        /*
        ************* Firstname validation **********************
        */   
    

        // const test1 = await reviewsData.create(safrronLounge._id,user3._id, 'This is amazing', 9)
        // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        // console.log('****-----------Get customer by id with username----------------***')
        // const testname = await customersData.getCustomerIdbyusername("username")
        // console.log(testname)
        const messi = await salonsData.create("messi", "http://www.saffrolounge.com", ["Makeup"], "New York City, New York", "New York", " NJ", "08820", 40.742628, -74.037628);
    console.log(messi);
    console.log('safrronLounge salon has been added successfully!');

    const ronaldo = await salonsData.create("roandlo", "http://www.timeindialaunge.com", ["Makeup","Hair"], "324 Central Ave", "Jersey City", "NJ", "07307", 40.7429498, -74.0512955);
    console.log(ronaldo);
    console.log('timeLaunge salon has been added successfully!');
        // console.log('****-----------Delete----------------***')
        // const deleted = await customersData.deleteCustomerbyId("61af9824b9fb68035098b5c1")
        // console.log(deleted)

    
        // console.log('Reviews added successfully')

        console.log('**********************')
        console.log('Done seeding database');
        console.log('**********************')
        await db.serverConfig.close();

};


main().catch((error) => {
    console.log(error);
});



