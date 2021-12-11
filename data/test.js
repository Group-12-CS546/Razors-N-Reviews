const { ObjectId } = require("mongodb");
//const { customers } = require(".");
const calculate = require("./calculate");
const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const reviews = mongoCollections.reviews;
const covidReviews = mongoCollections.covidReviews;

module.exports = {
	async addCovidReview(reviewId, covidRating) {
		console.log("This is running");
		 if (!salonId || typeof salonId != "string")
			throw "customerId must be given as a string";
		if (!reviewId || typeof reviewId != "string")
			throw "reviewId must be given as a string";
		if (!covidRating || typeof covidRating != "number")
			throw "covidRating must be given";
		/* let covidRating1 = await calculate.displayRadioValue(); */
		console.log(covidRating1);
		const covidReviewsCollection = await covidReviews();
		let newCovidReview = {
			customerId: customerId,
			reviewId: reviewId,
			covidRating: covidRating1,
		};

		//console.log("New Comment Added", newComment);
		const insertInfo = await covidReviewsCollection.insertOne(newCovidReview);
		console.log(insertInfo);
		const revCollection = await reviews();

		if (insertInfo.insertedCount === 0) {
			throw "Could not add new comment";
		}
		let parsedId2 = ObjectId(reviewId);
		const newId = insertInfo.insertedId;
		const covRating = await this.getCovidReview(newId.toString());
		console.log(covidRating1);
		const updatedInfo = await revCollection.updateOne(
			{ _id: parsedId2 },
			{ $push: { newCovidRating: newCovidReview.covidRating } }
		);
		if (updatedInfo.modifiedCount === 0) {
			throw "Could not update Review Collection with Review Data!";
		}
		return covRating;
	},
	async getCovidReview(id) {
		if (!id) throw "id must be given";
		let parsedId = ObjectId(id);
		const covidReviewsCollection = await covidReviews();
		const covidReviews = await covidReviewsCollection.findOne({
			_id: parsedId,
		});
		if (!covidReviews) throw "covidReviews with that id does not exist";
		return covidReviews;
	},
};
