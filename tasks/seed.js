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
    console.log(user2, "User 1 created successfully");

    const user3 = await customersData.createUser("Tonny", "Keith", "tonny@gmail.com", "tonnykk", "tonnykeith@123", "", "California", "California", "23");
    console.log(user3, "User 1 created successfully");

    const user4 = await customersData.createUser("Richard", "Endrew", "richard@gmail.com", "richardend", "richard@1234", "", "ohio", "ohio", "24");
    console.log(user4, "User 1 created successfully");

    const user5 = await customersData.createUser("Samuel", "jage", "samuel@gmail.com", "samueljage", "samuel@12", "", "hoboken", "New Jersey", "20");
    console.log(user5, "User 1 created successfully");

    const user6 = await customersData.createUser("Raymond", "wright", "raymond@gmail.com", "raymondwright", "raymond@w123", "", "texas", "texas", "26");
    console.log(user6, "User 1 created successfully");

    const user7 = await customersData.createUser("nina", "dobrev", "nina@gmail.com", "ninadob", "ninadob@rev", "", "New York", "New York", "24");
    console.log(user7, "User 1 created successfully");

    const user8 = await customersData.createUser("shraddha", "khair", "shraddha@gmail.com", "shraddhak", "shraddha123kh", "", "Edison", "New Jersey", "25");
    console.log(user8, "User 1 created successfully");

    const user9 = await customersData.createUser("Savleen", "Kaur", "savleen@gmail.com", "savleenkaur", "savleenk@678kaur", "", "Nutley", "New Jersey", "24");
    console.log(user9, "User 1 created successfully");

    const user10 = await customersData.createUser("Prateek", "Upereti", "prateek@gmail.com", "prateekup", "prateek@123", "", "Hoboken", "New Jersey", "24");
    console.log(user10, "User 1 created successfully");

    const user11 = await customersData.createUser("Muzzaffar", "Turak", "muzzaffar@gmail.com", "muzzaffar", "muzzaffartu", "", "Boton", "Boston", "24");
    console.log(user11, "User 1 created successfully");



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