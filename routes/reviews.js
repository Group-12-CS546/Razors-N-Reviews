const express = require("express");
const { reviews } = require("../config/mongoCollections");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;
const dataInfo = require("../data");
const customers = data.customers;
const salons = data.salons;
const comments = data.comments;

//Get data using salon id
router.get("/reviews/salons/:salonId", async (req, res) => {
	if (!req.params.salonId) {
		res
			.status(400)
			.json({ error: "You must provide a valid Salon ID for review" });
		return;
	}
	try {
		const salonList = await reviewsData.getAllreviewsofSalon(
			req.params.salonId
		);
		//console.log(salonList, 'SalonList')
		res.status(200).json(salonList);
	} catch (e) {
		//console.log('Hi I am savleen')
		res.status(404).json({ error: e });
	}
});

//get using review id
router.get("/:reviewId", async (req, res) => {
	if (!req.params.reviewId) {
		res.status(404).json({ error: "You must provide a Review ID for review" });
		return;
	}
	try {
		const reviewList = await reviewsData.getReviewById(req.params.reviewId);
		res.status(200).json(reviewList);
	} catch (e) {
		res.status(404).json({ message: e });
	}
});

//rendering error without message
//get all reviews by a customer
router.get("/reviews/customer/:customersId", async (req, res) => {
	if (!req.params.customersId) {
		res
			.status(404)
			.json({ error: "You must provide a Customer ID for review" });
		return;
	}
	try {
		console.log("Hicdvfsgbd");
		const reviewList = await reviewsData.getReviewsPerCustomer(
			req.params.customersId
		);
		console.log(reviewList, "reviewList");
		res.status(200).json(reviewList);
	} catch (e) {
		console.log("rgsnlb");
		res.status(404).json({ message: e });
	}
});

//create a review
router.post("/reviews/:salonId", async (req, res) => {
	let reviewData = req.body;
	if (!req.params.salonId) {
		res
			.status(400)
			.json({ error: "You must provide a valid Salon ID for review" });
		return;
	}
	if (!reviewData.customersId) {
		res.status(400).json({ error: "You must provide customer ID for review" });
		return;
	}
	if (!reviewData.reviewText) {
		res.status(400).json({ error: "You must provide a reviewer" });
		return;
	}
	if (!reviewData.rating) {
		res.status(400).json({ error: "You must provide a rating" });
		return;
	}

	try {
		const newPost = await reviewsData.create(
			req.params.salonId,
			reviewData.customersId,
			reviewData.reviewText,
			reviewData.rating,
			reviewData.rating
		);
		console.log(newPost, "For new Post");
		res.status(200).json(newPost);
	} catch (e) {
		res.status(400).json({ error: e });
	}
});

//delete review
router.delete("/:reviewId", async (req, res) => {
	if (!req.params.reviewId) {
		res.status(400).json({ error: "You must Supply an ID to delete" });
		return;
	}
	try {
		var reviewtoDelete = await reviewsData.getReviewById(req.params.reviewId);
	} catch (e) {
		res.json({ message: e });
		return;
	}
	try {
		await reviewsData.removeReview(req.params.reviewId);
		res.status(200).json({ reviewId: reviewtoDelete._id, deleted: true });
	} catch (e) {
		res.status(404).json({ error: e });
		return;
	}
});

router.put("/:reviewId", async (req, res) => {
	let RestInfo = req.body;
	if (!req.params.reviewId) {
		res.status(400).json({ error: "You must provide id" });
		return;
	}

	if (!RestInfo) {
		res
			.status(400)
			.json({ error: "You must provide data to update the review" });
		return;
	}

	if (!RestInfo.reviewText) {
		res.status(400).json({ error: "You must provide a text to update" });
		return;
	}

	try {
		await reviewsData.getReviewById(req.params.reviewId);
	} catch (e) {
		res.status(404).json({ message: e });
		return;
	}
	try {
		const updateSal = await reviewsData.update(
			req.params.reviewId,
			RestInfo.reviewText
		);
		console.log(updateSal, "Update sal");
		res.status(200).json(updateSal);
	} catch (e) {
		res.status(404).json({ message: e });
	}
});

module.exports = router;
