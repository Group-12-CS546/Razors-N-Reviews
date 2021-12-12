const { ObjectId } = require("mongodb");
//const { customers } = require(".");
// const calculate = require("./calculate");
const mongoCollections = require("../config/mongoCollections");
const salons = mongoCollections.salons;
const comments = mongoCollections.comments;
const reviews = mongoCollections.reviews;
const covidReviews = mongoCollections.covidReviews;
const salData = require("./salons");

module.exports = {
    async addCovidReview(reviewId, salonId, covidRating) {
        console.log("This is running");
        if (!reviewId || typeof reviewId != "string")
            throw "reviewId must be given as a string";
        if (!salonId || typeof salonId != "string")
            throw "customersId must be given as a string";
        if (!covidRating || typeof covidRating != "number")
            throw "covidRating must be given";
        console.log(covidRating);
        const covidReviewsCollection = await covidReviews();
        let newCovidReview = {
            reviewId: reviewId,
            salonId: salonId,
            covidRating: covidRating,
        };
        const insertInfo = await covidReviewsCollection.insertOne(newCovidReview);
        //let covid=this.getCovidReview(newCovidReview._id);
        //console.log(covid);
        const allCovidReviews = await covidReviewsCollection.find({}).toArray();
        console.log(allCovidReviews, "All covid Reviews");
        let arr = [];
        for (i in allCovidReviews) {
            if (allCovidReviews[i].reviewId == reviewId) {
                arr[i] = allCovidReviews[i].covidRating;
            }
        }
        console.log(arr);
        let sum = 0,
            avg = 0;
        for (i in arr) {
            sum = sum + arr[i];
        }
        let x = arr.length;
        avg = sum / x;
        avg = Math.floor(avg);
        console.log("New Covid Review Added", newCovidReview);
        if (insertInfo.insertedCount === 0) {
            throw "Could not add new covidReview";
        }
        const revCollection = await reviews();
        let parsedId2 = ObjectId(reviewId);
        //const newId = insertInfo.insertedId;
        //const covRating = await this.getCovidReview(newId.toString());
        //console.log(covRating);
        console.log("Covid Review Added");
        const updatedInfo = await revCollection.updateOne({ _id: parsedId2 }, { $set: { covidRating: avg } });
        //console.log(updatedInfo.insertedCount,"This is the updatedInfo***************66666");
        if (updatedInfo.modifiedCount === 0) {
            throw "Could not update Review Collection with Review Data!";
        }
        const salCollection = await salons();
        console.log(salonId);
        let parsedId = ObjectId(salonId);
        let arr2 = [];
        for (i in allCovidReviews) {
            if (allCovidReviews[i].salonId == salonId) {
                arr2[i] = allCovidReviews[i].covidRating;
            }
        }
        let sum1 = 0,
            avg1 = 0;
        for (i in arr2) {
            sum1 = sum1 + arr2[i];
        }
        let y = arr2.length;
        avg1 = sum1 / y;
        avg1 = Math.floor(avg1);
        //const newId = insertInfo.insertedId;
        //const covRating = await this.getCovidReview(newId.toString());
        //console.log(covRating);
        //let demo =newCovidReviepw.covidRating;
        const updatedInfo2 = await salCollection.updateOne({ _id: parsedId }, { $set: { covidRating: avg1 } });
        /* let sum = 0,
        		avg = 0;
        		const revdata = await this.getAll(restaurantId);
        	for (let eachrest of revdata)  */
        console.log(updatedInfo2.modifiedCount, "This is the updatedInfo***************66666")
        if (updatedInfo2.modifiedCount === 0) {
            throw "Could not update Salon Collection with Review Data!";
        }

        return newCovidReview;
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