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
const xss = require('xss');


router.post("/:reviewId/add", async (req, res) => {
    let errorcode=false;
	console.log("HIi from covidReview");
	console.log(req.body,"*********************");
	const review= await reviewsData.getReviewId(req.params.reviewId);
	console.log(review);
	if(review.covidRating)
	{
        errorcode=true;
		console.log("IF condition working");
		res.status(400).render("covidReview/error", {errorcode:errorcode,message: "You cannot give covidRating twice!!!"});
	}
	let a =xss(req.body.Parameter1);
	a=parseInt(a);
	let b =xss(req.body.Parameter2);
	b=parseInt(b);
	let c =xss(req.body.Parameter3);
	c=parseInt(c);
	let d =xss(req.body.Parameter4);
	d=parseInt(d);
	let e =xss(req.body.Parameter5);
	e=parseInt(e);
	if(a<1||a>=6)
	{
        errorcode=true;
		res.status(400).render("covidReview/error", {errorcode:errorcode,message: "Ratings provided should be in the range 1-5"})
	}
	if(b<1||b>=6)
	{
        errorcode=true;
		res.status(400).render("covidReview/error", {errorcode:errorcode,message: "Ratings provided should be in the range 1-5"})
	}
	if(c<1||c>=6)
	{
        errorcode=true;
		res.status(400).render("covidReview/error", {errorcode:errorcode,message: "Ratings provided should be in the range 1-5"})
	}
	if(d<1||d>=6)
	{
        errorcode=true;
		res.status(400).render("covidReview/error", {errorcode:errorcode,message: "Ratings provided should be in the range 1-5"})
	}
	if(e<1||e>=6)
	{
        errorcode=true;
		res.status(400).render("covidReview/error", {errorcode:errorcode,message: "Ratings provided should be in the range 1-5"})
	}
	console.log(a,b,c,d,e);
	let result= (a+b+c+d+e)/5;
	console.log(result,"This is the final covid rating");
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
			message: "Sucessfully added CovidReview", salonId: review.salonId 
		});
	} catch (e) {
		res.status(400).render("covidReview/error",{ error: e });
	}
});

module.exports = router;
