const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const commentsData = data.comments;
const covidReviewsData = data.covidReviews;
const customersData = data.customers;
const reviewsData = data.reviews;
const salonsData = data.salons;

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();

	const safrronLounge = await salonsData.create(
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
	console.log("safrronLounge restaurant has been added successfully!");
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

	const test1 = await reviewsData.create(
		safrronLounge._id,
		user1._id,
		"This is amazing",
		9
	);
	console.log(test1);
	console.log("Reviews added successfully");
	const comment1 = await commentsData.addComment(user1._id, test1._id, [
		"It is good.",
	]);
	console.log(comment1);
	console.log("Comment added successfully");

	console.log("Done seeding database");

	await db.serverConfig.close();
};

main().catch((error) => {
	console.log(error);
});
