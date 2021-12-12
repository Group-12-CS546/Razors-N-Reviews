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

router.post("/:reviewId/add", async(req, res) => {
    console.log("HIi from covidReview");
    console.log(req.body, "*********************");
    const review = await reviewsData.getReviewId(req.params.reviewId);
    console.log(review);
    if (review.covidRating) {
        console.log("IF condition working");
        res.status(400).render("covidReview/error", { message: "You cannot give covidRating twice!!!" });
    }
    let a = parseInt(req.body.Parameter1);
    let b = parseInt(req.body.Parameter2);
    let c = parseInt(req.body.Parameter3);
    let d = parseInt(req.body.Parameter4);
    let e = parseInt(req.body.Parameter5);
    if (a <= 1 || a >= 6) {
        res.status(400).render("covidReview/error", { message: "Ratings provided should be in the range 1-5" })
    }
    if (b <= 1 || b >= 6) {
        res.status(400).render("covidReview/error", { message: "Ratings provided should be in the range 1-5" })
    }
    if (c <= 1 || c >= 6) {
        res.status(400).render("covidReview/error", { message: "Ratings provided should be in the range 1-5" })
    }
    if (d <= 1 || d >= 6) {
        res.status(400).render("covidReview/error", { message: "Ratings provided should be in the range 1-5" })
    }
    if (e <= 1 || e >= 6) {
        res.status(400).render("covidReview/error", { message: "Ratings provided should be in the range 1-5" })
    }
    let result = (a + b + c + d + e) / 5;
    //let x=req.session.user.id;
    //console.log(req.session);
    console.log(result, "This is the final covid rating");
    /* const review= await reviewsData.getReviewId(req.params.reviewId);
    console.log(review);
    if(review.covidRating)
    {
    	res.status(400).render("covidReview/error", {message: "You cannot give covidRating twice!!!"});
    } */
    //console.log(reviewData);
    try {
        const newPost = await covidReview.addCovidReview(
            req.params.reviewId,
            review.salonId,
            result
        );
        console.log(newPost, "For new covid review ");

        res.status(200).render("covidReview/covid", {
            message: "Sucessfully added CovidReview",
            salonId: review.salonId
        });
    } catch (e) {
        res.status(400).json({ error: e });
    }
});



/* router.get("/salonId/add", async (req, res) => {
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
}); */


module.exports = router;