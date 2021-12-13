const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const commentsData = data.comments;
//const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;
const testData = data.test;

const main = async() => {
    const db = await dbConnection();
    await db.dropDatabase();
    //   Creating Salon Profile
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


    //   Creating Customers Profile
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
    // Creating Reviews
    const review11 = await reviewsData.create(DreamZ._id, user1._id, 'This is amazing', 9)
    console.log(review11)
    console.log('Reviews11 added successfully')


    // Creating Comment 
    const comment1 = await commentsData.addComment(
        user1._id,
        review11._id,
        "It is really good."
    );
    console.log(comment1)
    console.log("Comment1 added successfully");

    const comment2 = await commentsData.addComment(
        user1._id,
        review11._id,
        "I liked it too."
    );
    console.log(comment2)
    console.log("Comment2 added successfully");


    console.log("Comment22 added successfully");

    console.log("Done seeding database");

    await db.serverConfig.close();
};

main().catch((error) => {
    console.log(error);
});