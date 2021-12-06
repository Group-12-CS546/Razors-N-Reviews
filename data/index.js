const commentsData = require("./comments");
const covidReviewsData = require("./covidReviews");
const customersData = require("./customers");
const reviewsData = require("./reviews");
const salonsData = require("./salons");
const testData = require("./test");
const calculatedData = require("./calculate");

module.exports = {
	comments: commentsData,
	covidReviews: covidReviewsData,
	customers: customersData,
	reviews: reviewsData,
	salons: salonsData,
	test: testData,
	calculate: calculatedData,
};
