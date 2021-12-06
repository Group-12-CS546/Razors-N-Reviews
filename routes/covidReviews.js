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

//create a review
router.post("/:salonId/add", async (req, res) => {
	let reviewData = req.body;
	try {
		let covidRating1 = await calculate.displayRadioValue();
		const newPost = await covidReview.addCovidReview(
			req.params.salonId,
			reviewData.customersId,
			reviewData.covidRating1
		);
		console.log(newPost, "For new covid review ");

		res.status(200).render("covidReview/covid", {
			errorcode: errorcode,
			errors: errors,
			message: "Please provide a username",
		});
	} catch (e) {
		res.status(400).json({ error: e });
	}
}),
	router.get("/add", (req, res) => {
		let user = req.session.user;
		if (!req.session.user) {
			res.redirect("/");
		} else {
			res.render("users/private", {
				username: req.session.user.Username,
			});
		}
	});

module.exports = router;
