const express = require("express");
const { reviews } = require("../config/mongoCollections");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;
const dataInfo = require("../data");
const customers = data.customers;
const salons = data.salons;
const comments = data.comments;
const covidReview = data.test;
const calculate = data.calculate;

//Get data using salon id

//get using review i
/* router.get("/add", (req, res) => {
	let user = req.session.user;
	if (!req.session.user) {
		res.redirect("/");
	} else {
		res.render("users/private", {
			username: req.session.user.Username,
		});
	}
}); */

router.post("/covid", async (req, res) => {
	console.log("*********************");
	let reviewData = req.body;
	console.log(reviewData);
	try {
		//let covidRating1 = await calculate.displayRadioValue();
		const newPost = await covidReview.addCovidReview(
			req.params.customerId,
			req.params.reviewId,
			reviewData.covidRating1
		);
		console.log(newPost, "For new covid review ");

		res.status(200).render("covidReview/covid", {
			covidRating: covidRating1
		});
	} catch (e) {
		res.status(400).json({ error: e });
	}
});
router.get("/salonId/add", async (req, res) => {
	let reviewData = req.body;
	try {
		//let covidRating1 = await calculate.displayRadioValue();
		// const newPost = await covidReview.addCovidReview(
		// 	req.params.salonId,
		// 	reviewData.customersId,
		// 	reviewData.covidRating1
		// );
		// console.log(newPost, "For new covid review ");

		res.status(200).render("covidReview/covid", {
			// covidRating: covidRating1
		});
	} catch (e) {
		res.status(400).json({ error: e });
	}
});


module.exports = router;
