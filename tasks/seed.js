const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
// const commentsData = data.comments;
// const covidReviewsData = data.covidReviews;
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


    const user1 = await customersData.createUser("John", "Kolh", "john@gmail.com", "johnk", "johnkolh", "", "New York", "New York", "24");
    console.log(user1, "User 1 created successfully");

    const user2 = await customersData.createUser("Kate", "Ken", "kate@gmail.com", "katekk", " katekk123", "", "New Jersey", "New Jersey", "21");
    console.log(user2, "User 2 created successfully");

    const user3 = await customersData.createUser("Tonny", "Keith", "tonny@gmail.com", "tonnykk", "tonnykeith@123", "", "California", "California", "23");
    console.log(user3, "User 3 created successfully");

    const user4 = await customersData.createUser("Richard", "Endrew", "richard@gmail.com", "richardend", "richard@1234", "", "ohio", "ohio", "24");
    console.log(user4, "User 4 created successfully");

    const user5 = await customersData.createUser("Samuel", "jage", "samuel@gmail.com", "samueljage", "samuel@12", "", "hoboken", "New Jersey", "20");
    console.log(user5, "User 5 created successfully");

    const user6 = await customersData.createUser("Raymond", "wright", "raymond@gmail.com", "raymondwright", "raymond@w123", "", "texas", "texas", "26");
    console.log(user6, "User 6 created successfully");

    const user7 = await customersData.createUser("nina", "dobrev", "nina@gmail.com", "ninadob", "ninadob@rev", "", "New York", "New York", "24");
    console.log(user7, "User 7 created successfully");

    const user8 = await customersData.createUser("shraddha", "khair", "shraddha@gmail.com", "shraddhak", "shraddha123kh", "", "Edison", "New Jersey", "25");
    console.log(user8, "User 8 created successfully");

    const user9 = await customersData.createUser("Savleen", "Kaur", "savleen@gmail.com", "savleenkaur", "savleenk@678kaur", "", "Nutley", "New Jersey", "24");
    console.log(user9, "User 9 created successfully");

    const user10 = await customersData.createUser("Prateek", "Upereti", "prateek@gmail.com", "prateekup", "prateek@123", "", "Hoboken", "New Jersey", "24");
    console.log(user10, "User 10 created successfully");

    const user11 = await customersData.createUser("Muzzaffar", "Turak", "muzzaffar@gmail.com", "muzzaffar", "muzzaffartu", "", "Boton", "Boston", "24");
    console.log(user11, "User 11 created successfully");

    const review11 = await reviewsData.create(DreamZ._id, user1._id, 'This is amazing', "9")
    console.log(review11)
    console.log('Reviews11 added successfully')

    const review12 = await reviewsData.create(DreamZ._id, user1._id, 'This salon is not good', "4")
    console.log(review12)
    console.log('Reviews12 added successfully')

    const review21 = await reviewsData.create(Telogen._id, user2._id, 'This salon is perfectly good', "9")
    console.log(review21)
    console.log('Reviews21 added successfully')

    const review22 = await reviewsData.create(Telogen._id, user2._id, 'This salon smells good', "7")
    console.log(review22)
    console.log('Reviews22 added successfully')

    const review31 = await reviewsData.create(Roger._id, user3._id, 'This salon looks amazing', "7")
    console.log(review31)
    console.log('Reviews31 added successfully')

    const review32 = await reviewsData.create(Roger._id, user3._id, 'This salon services are not good', "2")
    console.log(review32)
    console.log('Reviews32 added successfully')

    const review41 = await reviewsData.create(Bloom._id, user4._id, 'This salon looks amazing', "8")
    console.log(review41)
    console.log('Reviews41 added successfully')

    const review42 = await reviewsData.create(Bloom._id, user4._id, 'This salon services are not worth', "2")
    console.log(review42)
    console.log('Reviews42 added successfully')

    const review43 = await reviewsData.create(Bloom._id, user4._id, 'This salon smells bad', "3")
    console.log(review43)
    console.log('Reviews43 added successfully')

    const review51 = await reviewsData.create(Aerea._id, user5._id, 'Very pleasant atmosphere, especially considering the difficult times we are all facing with the current pandemic.', "8")
    console.log(review51)
    console.log('Reviews51 added successfully')

    const review52 = await reviewsData.create(Aerea._id, user5._id, 'Extremely clean area! Greeted very warmly upon my entrance and seated almost immediately.', "9")
    console.log(review52)
    console.log('Reviews52 added successfully')

    const review61 = await reviewsData.create(Madison._id, user6._id, 'Absolutely cannot recommend this salon enough, every time I go I get consistent, quality service. Pricing is more than reasonable. ', "5")
    console.log(review61)
    console.log('Reviews61 added successfully')

    const review62 = await reviewsData.create(Madison._id, user6._id, ' I had gotten an unfortunate haircut from another establishment and she spent the time fixing every detail of my hair until it was perfect. She’s so skilled and so sweet. Highly recommend!', "9")
    console.log(review62)
    console.log('Reviews62 added successfully')

    const review71 = await reviewsData.create(Caru._id, user7._id, 'Great haircuts, fantastic services, love the atmosphere, nothing but a good afternoon.', "7")
    console.log(review71)
    console.log('Reviews71 added successfully')

    const review72 = await reviewsData.create(Caru._id, user7._id, ' This is the only salon that I trust to properly deal with my hair. Their extensive knowledge and skill are truly unmatched.', "8")
    console.log(review72)
    console.log('Reviews72 added successfully')

    const review81 = await reviewsData.create(Phoenix._id, user8._id, 'My first visit to this location was wonderful. Great vibe and friendly, helpful staff. Plus there is a bar !!', "7")
    console.log(review81)
    console.log('Reviews81 added successfully')

    const review82 = await reviewsData.create(Phoenix._id, user8._id, ' My first visit to this location was wonderful. Great vibe and friendly, helpful staff. Plus there is a bar !!', "9")
    console.log(review82)
    console.log('Reviews82 added successfully')

    const review91 = await reviewsData.create(Hudson._id, user9._id, 'Not good and recommended', "6")
    console.log(review91)
    console.log('Reviews91 added successfully')

    const review92 = await reviewsData.create(Hudson._id, user9._id, ' Got a cut due to their equipments...Not at all recommended', "4")
    console.log(review92)
    console.log('Reviews92 added successfully')

    const review93 = await reviewsData.create(Hudson._id, user9._id, 'Not punctual and service provided is not at all satisfactory', "4")
    console.log(review93)
    console.log('Reviews93 added successfully')


    // const skyLounge = await salonsData.create("The lounge", "http://www.skylounge.com", "Spa", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628");
    // console.log(skyLounge);
    // console.log('skyLounge salon has been added successfully!');

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

    // const updateSalon = await salonsData.update(skyLounge._id, "The sky lounge*****", "http://www.skylounge.com", "Spa", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628")
    // console.log(updateSalon);
    // console.log('salon has been updated successfully!');

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