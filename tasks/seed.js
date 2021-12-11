const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const commentsData = data.comments;
const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;

const main = async() => {

    const db = await dbConnection();
     //await db.dropDatabase();

    const olivebistro = await salonsData.create("The Punjabi Affair", "http://www.olivebistro.com", "hair", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628");
    console.log(olivebistro);
    console.log('olivebistro restaurant has been added successfully!');
    console.log(olivebistro._id, 'Salon id')

    // const user1 = await customersData.createUser("savleen","lastname","email","savleen","password","profilePicture","city","state","age");
    // console.log('************* User has been Added **********************');
    // console.log(user1);
    // console.log(user1._id, 'ID of user1')

    // const test1 = await reviewsData.create("61a3cd8b5b61d807549dfb93", "61a31464a9ae001b73e192e1", 'That good', 9);
    // console.log(test1)
    // console.log('Reviews added successfully')


    //For getting reviews of one salon
    // const saltest = await reviewsData.getAllreviewsofSalon("61a31460a9ae001b73e192df")
    // console.log(saltest, 'sal test')

    //For getting reveiws by customer
    // const custtest = await reviewsData.getReviewsPerCustomer("61a31464a9ae001b73e192e1")
    // console.log(custtest, 'custtest')

    //For getting review by review ID
    // const reviewtest = await reviewsData.getReviewById("61a51b4c960af80651deef19")
    // console.log(reviewtest, 'Review Test')

    //For removing the review using the review id
    // const removetest = await reviewsData.removeReview("61a6927c0ef55b0e44782308")
    // console.log(removetest, 'removetest')

    //For getid
    // const idtest = await reviewsData.getReviewId("61a51b4c960af80651deef19")
    // console.log(idtest, 'idtest')

    //Update review
    // const reviewupdate = await reviewsData.update("61a6907b3256520d8cf3d4d5", 'This is aahhhmaazings')
    // console.log(reviewupdate, 'Review Update')


    //Upvote
    //const upvotetest = await reviewsData.updateReviewLike("61a69059176e170d7bf74009", "61a31464a9ae001b73e192e1", 1)

    //Downvote
    //const downvotetest = await reviewsData.updateReviewLike("61a6907b3256520d8cf3d4d5", "61a31464a9ae001b73e192e1", 0)

    // const safrronLounge = await salonsData.create("The Saffron Lounge", "http://www.saffronlounge.com", ["Makeup"], "New York City, New York", "New York", " NJ", "08820", 40.732628, -74.037628);
    // console.log(safrronLounge);
    // console.log('safrronLounge salon has been added successfully!');
 
    // const safrronLounge1 = await salonsData.create("The Saffron Lounge1", "http://www.saffronlounge.com", ["Makeup"], "New York City, New York", "New York", " NJ", "08820", 40.732628, -74.037628);
    // console.log(safrronLounge1);
    // console.log('safrronLounge salon has been added successfully!');
 
    // const searchSalon = await salonsData.getSalonViaSearch("Makeup");
    // console.log("searchSalon", searchSalon)
 
 
    // const timeLaunge = await salonsData.create("The TimeIndia Lounge", "http://www.timeindialaunge.com", ["Makeup", "Hair"], "324 Central Ave", "Jersey City", "NJ", "07307", "40.7459498", "-74.0512955");
    // console.log(timeLaunge);
    // console.log('timeLaunge salon has been added successfully!');
 
    const getAllSalons = await salonsData.getAll();
    console.log('The List of Restaurants are:');
    console.log(getAllSalons);
 
    // const getSalonId = await salonsData.get(safrronLounge._id);
    // console.log("The Salon Id is:", getSalonId);
 
    // const getSpecificSalonId = await salonsData.get(timeLaunge._id)
    // await salonsData.remove(timeLaunge._id)
    // console.log("The deleted Id is:",getSpecificSalonId.name);   
 
    // const updateSalon = await salonsData.update(safrronLounge._id, "The Saffron", "http://www.saffronlounge.com", ["Makeup", "Hair"], "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628")
    // console.log(updateSalon);
    // console.log('salon has been updated successfully!');
 
    // const user1 = await customersData.createUser("savleen", "lastname", "email", "savleen", "password", "profilePicture", "city", "state", "age");
    // console.log('************* User has been Added **********************');
    // console.log(user1);
    // console.log(user1._id, 'ID of user1')
 
    // const test1 = await reviewsData.create("61b0db886924e10790444aba", user1._id, 'This is amazing', 9)
    // console.log(test1)
    // console.log('Reviews added successfully')

    console.log('Done seeding database');

    await db.serverConfig.close();

};

main().catch((error) => {
    console.log(error);
});