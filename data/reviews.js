const mongoCollections = require('../config/mongoCollections')
let { ObjectID } = require("mongodb");
const reviews = mongoCollections.reviews;
const salons = mongoCollections.salons;
const customer = mongoCollections.customers;


module.exports = {
    async create(salonId, customersId, reviewText, rating) //, comments, upvote, downvote)
    {
        // console.log(salonId, 'salonId')
        // console.log(customersId, 'customersId')
        // console.log(reviewText, 'reviewText')
        // console.log(rating, 'rating')
        salonId = salonId.toString();
        customersId = customersId.toString();
        if (typeof salonId != 'string') throw 'No Salon with proper type has been provided'
        if (salonId == null || salonId.length == 0) throw 'No Salon has been selected'
        if (salonId.trim() == '') throw 'Salon Id provided contains only empty spaces'

        if (customersId == null || customersId.length == 0) throw 'Customer ID has not been entered for Review'
        if (typeof customersId != 'string') throw 'No customer with proper type has been provided'
        if (customersId.trim() == '') throw 'Customer ID is provided contains only empty spaces'

        if (typeof reviewText != 'string') throw 'Review is not of appropriate type'
        if (reviewText == null || reviewText.length == 0) throw 'Review is not provided'
        if (reviewText.trim() == '') throw 'Review provided only contains blank spaces'

        if (typeof rating != 'string') throw 'Rating provided is not a string'
        if (rating.length == 0 || rating == null) throw 'Rating is not provided'
        if (rating <= 0 || rating > 11) throw 'Rating must be between 0-10'

        const reviewCollection = await reviews();
        const sal = await salons();

        const cust = await customer();

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(salonId);

        const checkSal = await sal.findOne({ _id: parsedId })
        if (checkSal === null) throw 'No Salon is present with that id'

        let parsedId1 = ObjectId(customersId);
        const checkCust = await cust.findOne({ _id: parsedId1 })
        if (checkCust === null) throw 'No Customer is present with that id'

        let newReview = {
            _id: ObjectId(),
            salonId: salonId,
            customersId: customersId,
            reviewText: reviewText,
            rating: rating,
            upvote: [],
            downvote: []
                //comments: comments
        }

        const insertInfo = await reviewCollection.insertOne(newReview);
        if (insertInfo.insertedCount === 0) throw 'Could not add new Review';

        // console.log(newReview, 'newReview')
        var demo
        var sum = 0
            //const OverallRatingNew = await sal.updateOne({ _id: parsedId }, { $addToSet: { reviews: newReview } })
            //console.log(OverallRatingNew, 'Overall new rating')

        let updateSal = await salons();

        let SalUpdate = await updateSal.updateOne({ _id: ObjectID(newReview.salonId) }, { $push: { reviewId: (newReview._id).toString() } })

        // const reviewofOneSal = await sal.findOne({ _id: parsedId });
        const reviewofOneSal = await sal.findOne({ _id: ObjectID(salonId) });
        // console.log(reviewofOneSal, 'Review of one sal')
        var demo = 0
        var sum = 0

        if (reviewofOneSal) {
            for (var i = 0; i < reviewofOneSal.reviewId.length; i++) {
                const reviewcaught = await this.getReviewId((reviewofOneSal.reviewId[i]));
                // console.log(reviewcaught, 'reviewcaught')
                demo = reviewcaught.rating
                    // console.log(demo, 'demo')
                sum = sum + demo
                    // console.log(sum, 'sum')
            }
            // console.log(sum, 'sum')
            var newOverallRating = Number((sum / (reviewofOneSal.reviewId.length)).toFixed(2))
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
            var newOverallRating = rating
        }

        let updateCustomer = await customer();
        let custUpdate = await updateCustomer.updateOne({ _id: ObjectID(newReview.customersId) }, { $push: { reviewId: (newReview._id).toString() } });
        //console.log(custUpdate, 'Custupdate')



        //let SalUpdate = await updateSal.updateOne({ _id: ObjectID(newReview.salonId) }, { $push: { reviewId: (newReview._id).toString() } })
        let SalUpdate1 = await updateSal.updateOne({ _id: ObjectID(newReview.salonId) }, { $set: { rating: newOverallRating } })

        //console.log(SalUpdate, 'Sal update')

        //await reviewCollection.updateOne({_id: parsedId},{$set: {overallRating: newOverallRating}});

        return JSON.parse(JSON.stringify(newReview))


    },

    //all reviews of one salon
    async getAllreviewsofSalon(salonId) {
        // console.log(salonId, 'id from data')
        if (salonId == null || salonId.length == 0) throw 'You must provide a Salon ID '
        if (typeof salonId !== 'string') throw 'Not valid type of SalonID provided';
        if (salonId.trim() == '') throw 'Blank spaces are provided in SalonID'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(salonId);

        const sal = await salons();

        const AllReviewsofaSal = await sal.findOne({ _id: parsedId });
        // console.log(AllReviewsofaSal, 'all reveiws of a sal')
        if (AllReviewsofaSal == null) throw 'Salon ID is not present'

        var ReviewList = []
            //console.log(AllReviewsofaSal.reviews.length, 'AllReviewsofaSal.reviews.length')
            // console.log('reivewId', AllReviewsofaSal.reviewId)
        for (var i = 0; i < AllReviewsofaSal.reviewId.length; i++) {
            var reviewcaught = await this.getReviewId(AllReviewsofaSal.reviewId[i])
                // console.log(reviewcaught)
            ReviewList.push(reviewcaught)
                // console.log(ReviewList, 'review list')
        }
        // console.log(ReviewList, 'review list')

        //var ReviewList = AllReviewsofaSal.reviews
        if (!ReviewList) throw 'Reviews of this salon not found';
        return ReviewList //JSON.parse(JSON.stringify(ReviewList));

    },


    //get review by customer
    async getReviewsPerCustomer(customersId) {
        customersId = customersId.toString();
        if (!customersId) throw "Pass id to fetch the data";
        if (typeof customersId !== 'string' || customersId.length === 0 || customersId.length !== 24) throw "The id should be an non empty string";

        const reviewCollection = await reviews();
        const reviewList = await reviewCollection.find({ 'customersId': customersId }).toArray();

        console.log(reviewList, 'reviewList from data')
            // var customerReviews = []

        // for (var i = 0; i < reviewList.length; i++) {
        //   customerReviews[i] = reviewList[i].reviewText
        // }
        //console.log(customerReviews, 'customerReviews')

        //if (!customerReviews) throw "No Reviews in the system for this customer";
        if (!reviewList) throw "No Reviews in the system for this customer";
        //  reviewList.forEach((val) => {
        //      val._id = (val._id).toString();
        //  })

        return reviewList;
    },


    //get review by id
    async getReviewById(reviewId) {
        if (reviewId == null || reviewId.length == 0) throw 'Reviw ID is null'
        if (typeof reviewId != 'string') throw 'Review ID is not of proper type'
        if (reviewId.trim() == '') throw 'Blank spaces are provided in Review Id'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(reviewId);

        const reviewCollection = await reviews();

        const reviewcaught = await reviewCollection.findOne(parsedId);
        // console.log(reviewcaught, 'reviewcaught')
        const onereview = reviewcaught.reviewText
        if (!onereview) throw 'No review found with the supplied review ID'
        return onereview;
        // if (!reviewcaught) throw 'No review found with the supplied review ID'
        // return reviewcaught;

    },

    //NA for route
    async getReviewId(reviewId) {
        //console.log(reviewId, 'reviewId from getreviewID')
        if (reviewId == null || reviewId.length == 0) throw 'Reviw ID is null'
        if (typeof reviewId != 'string') throw 'Review ID is not of proper type'
        if (reviewId.trim() == '') throw 'Blank spaces are provided in Review Id'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(reviewId);

        const reviewCollection = await reviews();

        const reviewcaught = await reviewCollection.findOne(parsedId);
        //console.log(reviewcaught, 'reviewcaught')
        //console.log(reviewcaught, 'reviewcaught from getreviewId func')

        return JSON.parse(JSON.stringify(reviewcaught))
    },


    async removeReview(reviewId) {
        // console.log(reviewId, 'Review ID')
        if (reviewId == null || reviewId.length == 0) throw 'Reviw ID is null'
        if (typeof reviewId != 'string') throw 'Review ID is not of proper type'
        if (reviewId.trim() == '') throw 'Blank spaces are provided in Review Id'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(reviewId);

        const reviewCollection = await reviews();

        var review = await this.getReviewId(reviewId)
            //var review = await reviewCollection.findOne({"review._id": parsedId})

        // var review = await this.getReviewById(reviewId)
        //console.log(review, 'review')


        const sal = await salons();
        const getSal = await sal.findOne(ObjectId(review.salonId));
        //console.log(getSal, 'get sal')
        //return
        var demoTest
        var test
            //console.log(getSal, 'getsal')
        if (getSal != null) {
            for (var i = 0; i < getSal.reviewId.length; i++) {
                demoTest = getSal.reviewId[i]
                    //console.log(demoTest, 'demoTest')
                    //console.log(demoTest._id, 'demoTest._id')
                if (demoTest == reviewId) {
                    test = demoTest
                        //console.log(test, 'test')
                    break;
                }
            }
        }
        if (test == null) {
            throw 'Review ID cannot be found'
        }

        var ReviewList = getSal.reviewId
            //console.log(ReviewList, 'ReviewList')
        var sum = 0;
        var demo = 0;


        if (ReviewList != null && ReviewList.length > 0) {
            for (var i = 0; i < ReviewList.length; i++) {
                //console.log(ReviewList[i] , 'Should returns')
                if (ReviewList[i] != reviewId) {
                    //console.log(ReviewList[i], 'ReviewList[i]')

                    var reviewcaught = await this.getReviewId(ReviewList[i]);
                    // console.log(reviewcaught, 'review caught')
                    demo = reviewcaught.rating
                    console.log(demo, 'demo')
                        // sum = sum + demo
                        //console.log(sum , 'sum')
                        //reviewcaught = null
                }

            }

            //console.log(sum, 'sum')
            //Number((sum / (ReviewList.length - 1)).toFixed(2));

            var avgRating = Number(sum / (ReviewList.length - 1).toFixed(2))
                //avgRating = Number(avgRating.toFixed(2));


        } else {
            avgRating = 0
        }

        const deleteInfo = await reviewCollection.removeOne({ _id: parsedId });
        if (deleteInfo.deletedCount === 0) throw `Could not delete review with id of ${parsedId}`;

        //console.log(avgRating, 'avgRating')
        await sal.updateOne({ _id: getSal._id }, { $set: { rating: avgRating } })

        let SalUpdate = await sal.updateOne({ _id: ObjectID(review.salonId) }, { $pull: { reviewId: reviewId } })

        let updateCustomer = await customer();
        let custUpdate = await updateCustomer.updateOne({ _id: ObjectID(review.customersId) }, { $pull: { reviewId: reviewId } });

        return { reviewiD: reviewId, deleted: true };
    },


    async update(reviewId, reviewText) {

        if (!reviewId) throw 'ID not provided';
        if (typeof reviewId !== 'string' || reviewId.length === 0) throw 'Id should be a non empty string';

        if (reviewText.trim() == '') throw 'Blank spaces are provided in Review to be updated'
        if (reviewText.length == 0 || !reviewText) throw 'Review Text is not provided'
        if (typeof reviewText !== 'string') throw 'Review should be text'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedID = ObjectID(reviewId);

        const reviewCollection = await reviews();

        let review = await reviewCollection.findOne(parsedID);
        if (review === null) throw 'No review with that id';
        // console.log(review, 'review')

        if (reviewText.length !== 0) {
            const updatedInfo = await reviewCollection.updateOne({ _id: parsedID }, { $set: { reviewText: reviewText } });
            if (!updatedInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
        }
        return await this.getReviewId(reviewId);
    },


    async updateReviewLike(reviewId, customersId, isLike) {
        if (reviewId == null || reviewId.length == 0) throw 'Reviw ID is null'
        if (typeof reviewId != 'string') throw 'Review ID is not of proper type'
        if (reviewId.trim() == '') throw 'Blank spaces are provided in Review Id'

        if (customersId == null || customersId.length == 0) throw 'Customer ID has not been entered for Review'
        if (typeof customersId != 'string') throw 'No customer with proper type has been provided'
        if (customersId.trim() == '') throw 'Customer ID is provided contains only empty spaces'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        const parsedId = ObjectId(reviewId);
        const custid = ObjectId(customersId)

        const reviewCollection = await reviews();
        let review = await reviewCollection.findOne({ _id: parsedId });
        if (review === null) throw 'No review with that id.';

        if (isLike == null) {
            await reviewCollection.updateOne({ _id: parsedId }, { $pull: { upvote: custid } });
            await reviewCollection.updateOne({ _id: parsedId }, { $pull: { downvote: custid } });
            return true;

        } else if (isLike) {
            const updateInfo = await reviewCollection.updateOne({ _id: parsedId }, { $addToSet: { upvote: custid } });
            await reviewCollection.updateOne({ _id: parsedId }, { $pull: { downvote: custid } });
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) return false;
            return true;

        } else {
            const updateInfo = await reviewCollection.updateOne({ _id: parsedId }, { $addToSet: { downvote: custid } });
            await reviewCollection.updateOne({ _id: parsedId }, { $pull: { upvote: custid } });
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) return false;
            return true;
        }
    }

}