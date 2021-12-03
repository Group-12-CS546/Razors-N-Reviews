const mongoCollections = require("../config/mongoCollections");
let { ObjectID } = require("mongodb");
//const { customers } = require('.');
const reviews = mongoCollections.reviews;
const salons = mongoCollections.salons;
const customer = mongoCollections.customers;
//const salonss = data.salons;
//const validchecking = require('./validchecking');

module.exports = {
	async create(
		salonId,
		customersId,
		reviewText,
		rating //, comments, upvote, downvote)
	) {
		salonId = salonId.toString();
		customersId = customersId.toString();
		if (typeof salonId != "string")
			throw "No Salon with proper type has been provided";
		if (salonId == null || salonId.length == 0)
			throw "No Salon has been selected";
		if (salonId.trim() == "")
			throw "Salon Id provided contains only empty spaces";

		if (customersId == null || customersId.length == 0)
			throw "Customer ID has not been entered for Review";
		if (typeof customersId != "string")
			throw "No customer with proper type has been provided";
		if (customersId.trim() == "")
			throw "Customer ID is provided contains only empty spaces";

		if (typeof reviewText != "string")
			throw "Review is not of appropriate type";
		if (reviewText == null || reviewText.length == 0)
			throw "Review is not provided";
		if (reviewText.trim() == "")
			throw "Review provided only contains blank spaces";

		if (typeof rating != "number") throw "Rating provided is not a number";
		if (rating.length == 0 || rating == null) throw "Rating is not provided";
		if (rating <= 0 || rating >= 10) throw "Rating must be between 0-10";

		//  if(comments)
		//  {
		//      if(comments.length == 0 || comments == null) throw 'Comments are not provided'
		//      if(comments.trim() == '') throw 'Only Blank spaces are provided in Comments'
		//      if(typeof comments!= 'string') throw 'Comments are not of appropriate type'

		//  }

		const reviewCollection = await reviews();
		const sal = await salons();

		const cust = await customer();

		let { ObjectId } = require("mongodb");
		let newObjId = ObjectId();
		if (!ObjectId.isValid(newObjId)) throw "Object id is not valid";
		let x = newObjId.toString();
		let parsedId = ObjectId(salonId);

		const checkSal = await sal.findOne({ _id: parsedId });
		if (checkSal === null) throw "No Salon is present with that id";

		let parsedId1 = ObjectId(customersId);
		const checkCust = await cust.findOne({ _id: parsedId1 });
		if (checkCust === null) throw "No Customer is present with that id";

		let newReview = {
			_id: ObjectId(),
			salonId: salonId,
			customersId: customersId,
			reviewText: reviewText,
			rating: rating,
			//comments: comments
		};

		const insertInfo = await reviewCollection.insertOne(newReview);
		if (insertInfo.insertedCount === 0) throw "Could not add new Review";

		console.log(newReview, "newReview");
		var demo;
		var sum = 0;
		//const OverallRatingNew = await sal.updateOne({ _id: parsedId }, { $addToSet: { reviews: newReview } })
		//console.log(OverallRatingNew, 'Overall new rating')

		let updateSal = await salons();

		let SalUpdate = await updateSal.updateOne(
			{ _id: ObjectID(newReview.salonId) },
			{ $push: { reviewId: newReview._id.toString() } }
		);

		// const reviewofOneSal = await sal.findOne({ _id: parsedId });
		const reviewofOneSal = await sal.findOne({ _id: ObjectID(salonId) });
		console.log(reviewofOneSal, "Review of one sal");
		var demo = 0;
		var sum = 0;

		if (reviewofOneSal) {
			for (var i = 0; i < reviewofOneSal.reviewId.length; i++) {
				const reviewcaught = await this.getReviewId(reviewofOneSal.reviewId[i]);
				console.log(reviewcaught, "reviewcaught");
				demo = reviewcaught.rating;
				console.log(demo, "demo");
				sum = sum + demo;
				console.log(sum, "sum");
			}
			console.log(sum, "sum");
			var newOverallRating = Number(
				(sum / reviewofOneSal.reviewId.length).toFixed(2)
			);
		}

		// if (reviewofOneSal) {
		//   const ReviewList =  await this.getAllreviewsofSalon(salonId)
		//   //var ReviewList = reviewofOneSal.reviews
		//   console.log(ReviewList, 'Review list')
		//   console.log(ReviewList.reviewId.length, 'ReviewList.reviewId.length')
		//   for (var i = 0; i < ReviewList.reviewId.length; i++) {
		//     demo = ReviewList[i].rating
		//     sum = sum + demo

		//   }
		//   console.log(sum, 'sum')
		//   //var newSum = sum + rating
		//   var newLength = ReviewList.length
		//   //console.log(newLength,'newLength')
		//   var newOverallRating = Number((sum / newLength).toFixed(2));
		//   console.log(newOverallRating, 'new overall rating')
		// }
		else {
			var newOverallRating = rating;
		}

		let updateCustomer = await customer();
		let custUpdate = await updateCustomer.updateOne(
			{ _id: ObjectID(newReview.customersId) },
			{ $push: { reviewId: newReview._id.toString() } }
		);
		//console.log(custUpdate, 'Custupdate')

		//let SalUpdate = await updateSal.updateOne({ _id: ObjectID(newReview.salonId) }, { $push: { reviewId: (newReview._id).toString() } })
		let SalUpdate1 = await updateSal.updateOne(
			{ _id: ObjectID(newReview.salonId) },
			{ $set: { rating: newOverallRating } }
		);

		//console.log(SalUpdate, 'Sal update')

		//await reviewCollection.updateOne({_id: parsedId},{$set: {overallRating: newOverallRating}});

		return JSON.parse(JSON.stringify(newReview));
	},

	//all reviews of one salon
	async getAllreviewsofSalon(salonId) {
		if (salonId == null || salonId.length == 0)
			throw "You must provide a Salon ID ";
		if (typeof salonId !== "string") throw "Not valid type of SalonID provided";
		if (salonId.trim() == "") throw "Blank spaces are provided in SalonID";

		let { ObjectId } = require("mongodb");
		let newObjId = ObjectId();
		if (!ObjectId.isValid(newObjId)) throw "Object id is not valid";
		let x = newObjId.toString();
		let parsedId = ObjectId(salonId);

		const sal = await salons();

		const AllReviewsofaSal = await sal.findOne({ _id: parsedId });
		//console.log(AllReviewsofaSal, 'all reveiws of a sal')
		if (AllReviewsofaSal == null) throw "Salon ID is not present";

		var ReviewList = [];
		//console.log(AllReviewsofaSal.reviews.length, 'AllReviewsofaSal.reviews.length')
		for (var i = 0; i < AllReviewsofaSal.reviews.length; i++) {
			ReviewList[i] = AllReviewsofaSal.reviews[i].reviewText;
			//console.log(ReviewList, 'review list')
		}
		console.log(ReviewList, "review list");

		//var ReviewList = AllReviewsofaSal.reviews
		if (!ReviewList) throw "Reviews of this salon not found";
		return ReviewList; //JSON.parse(JSON.stringify(ReviewList));
	},

	//get review by customer
	async getReviewsPerCustomer(customersId) {
		customersId = customersId.toString();
		if (!customersId) throw "Pass id to fetch the data";
		if (
			typeof customersId !== "string" ||
			customersId.length === 0 ||
			customersId.length !== 24
		)
			throw "The id should be an non empty string";

		const reviewCollection = await reviews();
		const reviewList = await reviewCollection
			.find({ customersId: customersId })
			.toArray();

		console.log(reviewList, "reviewList");
		var customerReviews = [];

		for (var i = 0; i < reviewList.length; i++) {
			customerReviews[i] = reviewList[i].reviewText;
		}
		//console.log(customerReviews, 'customerReviews')

		if (!customerReviews) throw "No Reviews in the system for this customer";
		//  reviewList.forEach((val) => {
		//      val._id = (val._id).toString();
		//  })

		return customerReviews;
	},

	//get review by id
	async getReviewById(reviewId) {
		if (reviewId == null || reviewId.length == 0) throw "Reviw ID is null";
		if (typeof reviewId != "string") throw "Review ID is not of proper type";
		if (reviewId.trim() == "") throw "Blank spaces are provided in Review Id";

		let { ObjectId } = require("mongodb");
		let newObjId = ObjectId();
		if (!ObjectId.isValid(newObjId)) throw "Object id is not valid";
		let x = newObjId.toString();
		let parsedId = ObjectId(reviewId);

		const reviewCollection = await reviews();

		const reviewcaught = await reviewCollection.findOne(parsedId);
		//console.log(reviewcaught, 'reviewcaught')
		const onereview = reviewcaught.reviewText;
		if (!onereview) throw "No review found with the supplied review ID";
		return onereview;
		// if (!reviewcaught) throw 'No review found with the supplied review ID'
		// return reviewcaught;
	},

	//NA for route
	async getReviewId(reviewId) {
		if (reviewId == null || reviewId.length == 0) throw "Reviw ID is null";
		if (typeof reviewId != "string") throw "Review ID is not of proper type";
		if (reviewId.trim() == "") throw "Blank spaces are provided in Review Id";

		let { ObjectId } = require("mongodb");
		let newObjId = ObjectId();
		if (!ObjectId.isValid(newObjId)) throw "Object id is not valid";
		let x = newObjId.toString();
		let parsedId = ObjectId(reviewId);

		const reviewCollection = await reviews();

		const reviewcaught = await reviewCollection.findOne(parsedId);
		//console.log(reviewcaught, 'reviewcaught')

		return JSON.parse(JSON.stringify(reviewcaught));
	},

	async removeReview(reviewId) {
		if (reviewId == null || reviewId.length == 0) throw "Reviw ID is null";
		if (typeof reviewId != "string") throw "Review ID is not of proper type";
		if (reviewId.trim() == "") throw "Blank spaces are provided in Review Id";

		let { ObjectId } = require("mongodb");
		let newObjId = ObjectId();
		if (!ObjectId.isValid(newObjId)) throw "Object id is not valid";
		let x = newObjId.toString();
		let parsedId = ObjectId(reviewId);

		const reviewCollection = await reviews();

		var review = await this.getReviewId(reviewId);
		//var review = await reviewCollection.findOne(parsedId)

		// var review = await this.getReviewById(reviewId)
		console.log(review, "review");

		const sal = await salons();
		const getSal = await sal.findOne(ObjectId(review.salonId));
		console.log(getSal, "get sal");
		//return
		var demoTest;
		var test;
		//console.log(getSal, 'getsal')
		if (getSal != null) {
			for (var i = 0; i < getSal.reviewId.length; i++) {
				demoTest = getSal.reviewId[i];
				//console.log(demoTest, 'demoTest')
				//console.log(demoTest._id, 'demoTest._id')
				if (demoTest == reviewId) {
					test = demoTest;
					console.log(test, "test");
					break;
				}
			}
		}
		if (test == null) {
			throw "Review ID cannot be found";
		}
		//For now, remainingreview = getSal

		// const updateDetails = await reviewCollection.updateOne(
		//     { _id: review._id },
		//     { $pull: { reviews: { _id: parsedId } } });

		// const remainingReview = await sal.findOne({ _id: getSal._id });
		// console.log(remainingReview, 'remainingReview')
		//return

		// if (!updateDetails.matchedCount && !updateDetails.modifiedCount) {
		//     throw 'Update failed';
		// }
		// demo = reviewcaught.rating
		//     console.log(demo, 'demo')
		//     sum = sum + demo
		var ReviewList = getSal.reviewId;
		var sum = 0;
		if (ReviewList != null && ReviewList.length > 0) {
			for (var i = 0; i < ReviewList.length; i++) {
				if (ReviewList[i] != reviewId) {
					console.log(ReviewList[i], "ReviewList[i]");
					var reviewcaught = await this.getReviewId(ReviewList[i]);
					var demo = reviewcaught.rating;
					console.log(demo, "demo");
					sum = sum + demo;
				}
				// var demo = remainingReview.reviews[i]
				// console.log(demo, 'demo')
				// sum = demo.rating + sum
				// console.log(sum, 'sum')
			}
			console.log(sum, "sum");
			//Number((sum / (ReviewList.length - 1)).toFixed(2));

			var avgRating = sum / (ReviewList.length - 1).toFixed(2);
			//avgRating = Number(avgRating.toFixed(2));
		} else {
			avgRating = 0;
		}

		const deleteInfo = await reviewCollection.removeOne({ _id: parsedId });
		if (deleteInfo.deletedCount === 0)
			throw `Could not delete review with id of ${parsedId}`;

		console.log(avgRating, "avgRating");
		await sal.updateOne({ _id: getSal._id }, { $set: { rating: avgRating } });

		let SalUpdate1 = await sal.updateOne(
			{ _id: ObjectID(review.salonId) },
			{ $pull: { reviewId: reviewId } }
		);

		// const sal = await salons();
		// const reviewofOneSal = await sal.findOne({ "reviews._id": parsedId });

		// var test

		// console.log(reviewofOneSal, 'reviewofOneSal')
		// for(var i =0; i<reviewofOneSal.reviews; i++)
		// {
		//   if(reviewiD == (reviewofOneSal.reviews[i]._id.toString()))
		//   {
		//     test = reviewofOneSal.reviews[i].id

		//   }
		// }
		// console.log(test, 'test')

		// const deleteInfo = await reviewCollection.removeOne({ _id: parsedId });
		// if (deleteInfo.deletedCount === 0) throw `Could not delete review with id of ${parsedId}`;

		// //  const sal = await salons();
		// //const reviewofOneSal = await sal.findOne({ "reviews._id": parsedId });
		// if (!reviewofOneSal) throw 'No Review is present with that id'

		// let newOverallRating = 0
		// if (reviewofOneSal != null && reviewofOneSal.reviews != null && reviewofOneSal.reviews.length > 0) {
		//   var sum = 0;
		//   var demo
		//   var ReviewList = reviewofOneSal.reviews
		//   //console.log(ReviewList.length)
		//   for (var i = 0; i < ReviewList.length; i++) {
		//     if (ReviewList[i]._id != reviewId) {
		//       //console.log(ReviewList[i]._id, 'ReviewList[i]._id')
		//       demo = ReviewList[i].rating
		//       //console.log(demo,'demo')
		//       sum = sum + demo
		//     }
		//   }
		//   //console.log(sum,'sum')
		//   newOverallRating = Number((sum / (ReviewList.length - 1)).toFixed(2));
		//   //console.log(newOverallRating)
		// }
		// else {
		//   //console.log('Hi checking for 0')
		//   newOverallRating = 0
		// }

		// await sal.updateOne({ _id: reviewofOneSal._id }, { $set: { rating: newOverallRating } });

		// let updateCustomer = await customer();
		// let custUpdate = await updateCustomer.updateOne({ _id: ObjectID(review.customersId) }, { $pull: { reviewId: test } });

		// //let updateSal = await salons();
		// let SalUpdate = await sal.updateOne({ _id: ObjectID(review.salonId) }, { $pull: { reviews: test } })
		// let SalUpdate1 = await sal.updateOne({ _id: ObjectID(review.salonId) }, { $pull: { reviewId: test } })

		return { reviewiD: reviewId, deleted: true };
	},

	async update(reviewId, reviewText) {
		reviewId = reviewId.toString();
		if (!reviewId) throw "ID not provided";
		if (typeof reviewId !== "string" || reviewId.length === 0)
			throw "Id should be a non empty string";
		//if(id.length !== 24) throw 'Not a valid ID';
		let parsedID = ObjectID(reviewId);
		//console.log("hello0");

		const reviewCollection = await reviews();

		let review = await reviewCollection.findOne({ _id: parsedID });
		if (review === null) throw "No review with that id.";
		console.log(review, "review");

		if (!reviewText) throw "Review not provided";
		if (typeof reviewText !== "string" || reviewText.length === 0)
			throw "Review Text is empty";

		if (reviewText.length !== 0) {
			//const reviewCollection = await reviews();
			//const newReview = await this.getReviewById(reviewId);

			const updatedInfo = await reviewCollection.updateOne(
				{ _id: parsedID },
				{ $set: { reviewText: reviewText } }
			);

			let updateSal = await salons();
			const findonesal = await updateSal.findOne({ "reviews._id": parsedID });
			//let findonesal = await updateSal.findAll()

			console.log(findonesal, "findonesal");

			//var test
			var demoTest;

			for (var i = 0; i < findonesal.reviews.length; i++) {
				demoTest = findonesal.reviews[i];
				console.log(demoTest, "demoTest");

				if (demoTest._id == reviewId) {
					console.log(demoTest._id, "demoTest._id");

					test = demoTest;

					break;
				}
			}
			console.log(test, "test");

			//Ask
			// var salUpdate = await updateSal.updateOne({_id: test._id}, { $set: { reviewText: reviewText }})
			// console.log(salUpdate.modifiedCount, 'salUpdate.modifiedCount')

			//if (salUpdate.modifiedCount)

			//let SalUpdate = await updateSal.updateOne({_id:ObjectID(newReview.salonId)},{ $push: { reviewId: (newReview._id).toString()}})
			let SalUpdate = await updateSal.updateOne(
				{ _id: ObjectID(review.salonId), "reviews._id": parsedID },
				{ $set: { "reviews.$.reviewText": reviewText } }
			);

			if (!updatedInfo.matchedCount && !updateInfo.modifiedCount)
				throw "Update failed";
		}
		return await this.getReviewById(reviewId);
	},
};
