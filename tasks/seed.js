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

     const DreamZ = await salonsData.create("DreamZ Beauty Salon", "http://www.dreamzbeautys.com", "hair", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "70.7", "50.9")
     console.log(DreamZ, "DreamZ has been added successfully")

     const Telogen = await salonsData.create("Telogen Salon & Spa", "http://www.telogenspa.com", "nail", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "74.76", "54.99")
     console.log(Telogen, "Telogen has been added successfully")

     const Roger = await salonsData.create("Roger Markel Salon", "http://www.rogermarkel.com", "hair", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "67.3", "45.3")
     console.log(Roger, "Roger has been added successfully")

     const Bloom = await salonsData.create("Bloom beauty lounge", "http://www.bloombeautylounge.com", "foot", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "80.98", "70.76")
     console.log(Bloom, "Bloom has been added successfully")

     const Aerea = await salonsData.create("The Aerea Salon", "http://www.aereasalon.com", "hair", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "72.8", "56.7")
     console.log(Aerea, "Aerea has been added successfully")

     const Madison = await salonsData.create("Madison Reed Hair Color Bar", "http://www.madisonreedhaircolor.com", "hair", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "90.75", "70.3")
     console.log(Madison, "Madison has been added successfully")

     const Caru = await salonsData.create("The Salon Caru", "http://www.saloncaru.com", "nail", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "68.4", "59.45")
     console.log(Caru, "Caru has been added successfully")

     const Phoenix = await salonsData.create("Salon Phoenix", "http://www.salonpheonix.com", "waxing", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "76.63", "76.75")
     console.log(Phoenix, "Phoenix has been added successfully")

     const Hudson = await salonsData.create("Hudson Sqaure Salon", "http://www.hudsonsqaure.com", "waxing", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "74.3", "82.3")
     console.log(Hudson, "Hudson has been added successfully")

     const Sole = await salonsData.create("Sole Salon", "http://www.solesalonhudson.com", "spa", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "71.3", "81.3")
     console.log(Sole, "Sole has been added successfully")

     const UpOut = await salonsData.create("Up & Out Salon", "http://www.upnoutsalon.com", "makeup", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "61.3", "89.3")
     console.log(UpOut, "UpOut has been added successfully")

     const Sorella = await salonsData.create("Sorella Mia", "http://www.sorellamia.com", "makeup", "Washington Street Hoboken", "Hoboken", "New Jersey", "07030", "89.3", "99.3")
     console.log(Sorella, "Sorella has been added successfully")

    // const olivebistro = await salonsData.create("The Punjabi Affair", "http://www.olivebistro.com", "hair", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628");
    // console.log(olivebistro);
    // console.log('olivebistro restaurant has been added successfully!');
    // console.log(olivebistro._id, 'Salon id')

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
 
    // const getAllSalons = await salonsData.getAll();
    // console.log('The List of Restaurants are:');
    // console.log(getAllSalons);
 
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