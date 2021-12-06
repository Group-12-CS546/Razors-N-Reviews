/* const commentsRoutes = require("./comments");
const covidReviewsRoutes = require("./covidReviews");
const customersRoutes = require("./customers");
//const reviewsRoutes = require("./reviews");
const salonsRoutes = require("./salons");

const constructorMethod = (app) => {
	app.use("/comments", commentsRoutes);
	app.use("/salons", salonsRoutes);
	//app.use("/reviews", reviewsRoutes);
	app.use("/", customersRoutes);
	app.use("/covidReviews", covidReviewsRoutes);

	app.use("*", (req, res) => {
		res.status(404).json({ error: "Not found" });
	});
};

module.exports = constructorMethod; */

const commentsRoutes = require("./comments");
//const covidReviewsRoutes = require('./covidReviews');
//const customersRoutes = require("./customers");
//const reviewsRoutes = require("./reviews");
//const salonsRoutes = require("./salons");

const constructorMethod = (app) => {
	app.use("/comments", commentsRoutes);
	// app.use('', covidReviewsRoutes);
	//app.use("/customers", customersRoutes);
	//app.use("/reviews", reviewsRoutes);
	//app.use("/salons", salonsRoutes);

	app.use("*", (req, res) => {
		res.status(404).json({ error: "Not found" });
	});
};

module.exports = constructorMethod;
