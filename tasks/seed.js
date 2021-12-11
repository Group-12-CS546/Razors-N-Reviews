const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const commentsData = data.comments;
//const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;
const testData = data.test;

const main = async () => {
	const db = await dbConnection();
	const olivebistro = await salonsData.create("The Punjabi Affair", "http://www.olivebistro.com", "hair", "New York City, New York", "New York", " NJ", "08820", "40.732628", "-74.037628");
    console.log(olivebistro);
    console.log('olivebistro restaurant has been added successfully!');
    console.log(olivebistro._id, 'Salon id')



	//await db.dropDatabase();

	/* const safrronLounge = await salonsData.create(
		"The Saffron Lounge",
		"http://www.saffronlounge.com",
		"Makeup",
		"New York City, New York",
		"New York",
		" NJ",
		"08820",
		3,
		3,
		"Shraddha"
	);
	console.log(safrronLounge);
	console.log("safrronLounge salon has been added successfully!");
	console.log(safrronLounge._id, "Salon id");

	const user1 = await customersData.createUser(
		"savleen",
		"lastname",
		"email",
		"savleen",
		"password",
		"profilePicture",
		"city",
		"state",
		"age"
	);
	console.log("************* User has been Added **********************");
	console.log(user1);
	console.log(user1._id, "ID of user1");
	const user2 = await customersData.createUser(
		"Pratik",
		"lastnlksjdfkame",
		"esdfmail",
		"pratik",
		"password",
		"profilePicture",
		"city",
		"state",
		"age"
	);
	console.log("************* User2 has been Added **********************");
	console.log(user2);
	console.log(user2._id, "ID of user1");

	const test1 = await reviewsData.create(
		safrronLounge._id,
		user1._id,
		"This is amazing",
		9
	);
	console.log(test1);
	console.log("Reviews added successfully");

	const test2 = await reviewsData.create(
		safrronLounge._id,
		user2._id,
		"This not amazing",
		9
	);
	console.log(test2);
	console.log("Reviews 2 added successfully");

	const comment1 = await commentsData.addComment(
		user1._id,
		test1._id,
		"It is really good."
	);
	const comment2 = await commentsData.addComment(
		user2._id,
		test2._id,
		"It was not that good"
	);
	console.log(comment2);
	console.log("Second Comment added successfully");

	const getComment = await commentsData.getComment(comment1._id);
	console.log(comment1._id);
	console.log(getComment);
	console.log("get comment working successfully");
 */
	/* const updatedComment = await commentsData.updateComment(
		getComment._id,
		"New updated comment"
	);
	console.log(updatedComment);
	console.log("Comment updated"); */

	/* const commentsforCustomer = await commentsData.getCommentsForCustomer(
		user1._id
	);
	console.log(commentsforCustomer);
	console.log("Comments for customer working"); */

	//const commentsforReviews= await commentsData.getCommentsForReview()

	//const removedComment = await commentsData.removeComment(comment1._id);

	/* const covidRating = await covidReviewsData.addCovidReview(
		test1._id,
		safrronLounge._id,
		user1._id,
		4
	); */

	/* const covidRating = await testData.addCovidReview(user1._id, test1._id, 4);
	console.log(covidRating); */
	console.log("Done seeding database");

	await db.serverConfig.close();
};

main().catch((error) => {
	console.log(error);
});
