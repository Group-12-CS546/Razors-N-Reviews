const { ObjectId } = require("mongodb");

const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.covidReviews;
const salons = mongoCollections.salons;
const customers = mongoCollections.customers;
//const comments = mongoCollections.comments;
//const commentFunctions = require("./comments");
// const uuid = require('uuid/v4');

module.exports = {
	async addCovidReview(reviewId, salonId, covidRating) {
		if (!reviewId || typeof reviewId != "string")
			throw "Salon ID must be given as a string";
		if (!salonId || typeof salonId != "string")
			throw "Salon ID must be given as a string";
		if (!customerId || typeof customerId != "string")
			throw "CustomerId text must be given as a string";
		if (
			!rating ||
			typeof covidRating != "number" ||
			covidRating < 1 ||
			covidRating > 5
		)
			throw "covidRating must be given as a number from 1 to 5";
		const revCollection = await reviews();
		let newReview = {
			reviewId: reviewId,
			salonId: salonId,
			customerId: customerId,
			covidRating: covidRating,
		};
		/* const alreadyReviewed = await reviewCollection.findOne({
			$and: [
				{
					salonId: salonId,
				},
				{
					customerId: customerId,
				},
			],
		}); 
		if (alreadyReviewed) throw "This user already reviewed this Salon";*/
		let parsedId = ObjectId(reviewId);
		//const insertInfo = await revCollection.insertOne(newReview);
		const insertInfo = await revCollection.updateOne(
			{ _id: parsedId },
			{ $push: { covidRating: covidRating } }
		);
		// if (insertInfo.insertedCount === 0) throw "could not add review";

		//const salCollection = await salons();

		/* const salCollection = ObjectId.createFromHexString(salonId);
		const objIdForCust = ObjectId.createFromHexString(customerId); */

		// const insertInfo = await commentCollection.insertOne(newAlbum);

		if (insertInfo.insertedCount === 0) {
			throw "Could not add new Review";
		} else {
			//Add the review id to the salon
			const updatedInfo = await salCollection.updateOne(
				{ _id: salCollection },
				{ $push: { reviews: String(newReview._id) } }
			);

			if (updatedInfo.modifiedCount === 0) {
				throw "Could not update Salon Collection with Review Data!";
			}
			//Add the review id to the user
			const updatedInfo2 = await customerCollection.updateOne(
				{ _id: objIdForCust },
				{ $push: { reviewIds: String(newReview._id) } }
			);
			if (updatedInfo2.modifiedCount === 0) {
				throw "Could not update Customer Collection with Review Data!";
			}
		}

		const newId = insertInfo.insertedId;
		const newIDString = String(newId);
		const review = await this.getReview(newIDString);
		return review;
	},

	async getCovidReview(id) {
		if (!id) throw "id must be given";
		if (typeof id === "string") id = ObjectId.createFromHexString(id);
		const reviewCollection = await reviews();
		const review = await reviewCollection.findOne({ _id: id });
		if (!review) throw "review with that id does not exist";
		return review;
	},

	/* async getAllReviews() {
		const reviewCollection = await reviews();
		const reviewList = await reviewCollection.find({}).toArray();
		if (reviewList.length === 0) throw "no reviews in the collection";
		return reviewList;
	}, */

	async updateReview(id, updatedReview) {
		if (typeof id === "string") id = ObjectId(id);
		const reviewCollection = await reviews();
		const updatedReviewData = {};
		if (updatedReview.reviewText) {
			updatedReviewData.reviewText = updatedReview.reviewText;
		}

		if (updatedReview.rating) {
			updatedReviewData.rating = updatedReview.rating;
		}

		if (updatedReview.reviewPicture) {
			updatedReviewData.reviewPicture = updatedReview.reviewPicture;
		}
		// console.log(updatedReviewData);
		await reviewCollection.updateOne({ _id: id }, { $set: updatedReviewData });
		return await this.getReview(id);
	},

	async removeReview(id) {
		if (!id) throw "id must be given";
		const reviewcollection = await reviews();
		const { ObjectId } = require("mongodb");
		const objRevId = ObjectId.createFromHexString(id);
		const reviewSearch = await reviewcollection.findOne({ _id: objRevId });
		const commentList = reviewSearch.comments;
		if (reviewSearch === null) {
			throw "No Review with id - " + id;
		}
		if (commentList.length != 0) {
			for (var j = 0; j < commentList.length; j++) {
				try {
					const commentCollection = await comments();
					const { ObjectId } = require("mongodb");
					const objCommentId = ObjectId.createFromHexString(commentList[j]);
					const deletionInfoForComment = await commentCollection.removeOne({
						_id: objCommentId,
					});

					if (deletionInfoForComment.deletedCount === 0) {
						throw `Could not delete Comment with id of ${commentList[j]}`;
					}
				} catch (e) {
					throw "Could not Delete Comment while deleting Review!";
				}
			}
		}
		try {
			const userCollection = await users();
			const { ObjectId } = require("mongodb");
			const objUserId = ObjectId.createFromHexString(reviewSearch.userId);
			const deletionInfoForReviewFromUsers = await userCollection.updateOne(
				{ _id: objUserId },
				{ $pull: { reviewIds: String(id) } }
			);

			if (deletionInfoForReviewFromUsers.deletedCount === 0) {
				throw `Could not delete Review with id of ${id}`;
			}
		} catch (e) {
			throw "Could not Delete Review from User while Deleting Review!";
		}
		try {
			const resCollection = await restaurants();
			const { ObjectId } = require("mongodb");
			const objResId = ObjectId.createFromHexString(reviewSearch.restaurantId);
			const deletionInfoForReviewFromRestaurant = await resCollection.updateOne(
				{ _id: objResId },
				{ $pull: { reviews: String(id) } }
			);

			if (deletionInfoForReviewFromRestaurant.deletedCount === 0) {
				throw `Could not delete Review with id of ${id}`;
			}
		} catch (e) {
			throw `Could not delete Review from Restaurant while Deleting Review!`;
		}
		const deletionInfoForReview = await reviewcollection.removeOne({
			_id: objRevId,
		});
		if (deletionInfoForReview.deletedCount === 0) {
			throw `Could not delete Review with id of ${objRevId}`;
		}
		return true;
	},
};
