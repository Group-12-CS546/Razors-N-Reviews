const mongoCollections = require('../config/mongoCollections')
let { ObjectID } = require("mongodb");
const reviews = mongoCollections.reviews;
const salons = mongoCollections.salons;
const customer = mongoCollections.customers;


module.exports = {
    async create(salonId, customersId, reviewText, rating)
    {
        rating = Number(rating)
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

        if (typeof rating != 'number') throw 'Rating provided is not a string'
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
        }

        const insertInfo = await reviewCollection.insertOne(newReview);
        if (insertInfo.insertedCount === 0) throw 'Could not add new Review';

        var demo
        var sum = 0

        let SalUpdate = await sal.updateOne({ _id: ObjectID(newReview.salonId) }, { $push: { reviewId: (newReview._id).toString() } })

        const reviewofOneSal = await sal.findOne({ _id: ObjectID(salonId) });
        
        var demo = 0
        var sum = 0

        if (reviewofOneSal) {
            for (var i = 0; i < reviewofOneSal.reviewId.length; i++) {
                const reviewcaught = await this.getReviewId((reviewofOneSal.reviewId[i]));
               
                demo = reviewcaught.rating
               
                sum = sum + demo
               
            }
            
            var newOverallRating = Number((sum / (reviewofOneSal.reviewId.length)).toFixed(2))
        }
        else {
            var newOverallRating = rating
        }

        let updateCustomer = await customer();
        let custUpdate = await updateCustomer.updateOne({ _id: ObjectID(newReview.customersId) }, { $push: { reviewId: (newReview._id).toString() } });
        let SalUpdate1 = await sal.updateOne({ _id: ObjectID(newReview.salonId) }, { $set: { rating: newOverallRating } })
        return JSON.parse(JSON.stringify(newReview))
    },

    //all reviews of one salon
    async getAllreviewsofSalon(salonId) {
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
        if (AllReviewsofaSal == null) throw 'Salon ID is not present'

        var ReviewList = []
        for (var i = 0; i < AllReviewsofaSal.reviewId.length; i++) {
            var reviewcaught = await this.getReviewId(AllReviewsofaSal.reviewId[i])
            ReviewList.push(reviewcaught)
        }

        if (!ReviewList) throw 'Reviews of this salon not found';
        return ReviewList 

    },


    //get review by customer
    async getReviewsPerCustomer(customersId) {
        customersId = customersId.toString();
        if (!customersId) throw "Pass id to fetch the data";
        if (typeof customersId !== 'string' || customersId.length === 0 || customersId.length !== 24) throw "The id should be an non empty string";

        const reviewCollection = await reviews();
        const reviewList = await reviewCollection.find({ 'customersId': customersId }).toArray();

        console.log(reviewList, 'reviewList from data')
        if (!reviewList) throw "No Reviews in the system for this customer";
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
        const onereview = reviewcaught.reviewText
        if (!onereview) throw 'No review found with the supplied review ID'
        return onereview;

    },

    //NA for route
    async getReviewId(reviewId) {
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
        return JSON.parse(JSON.stringify(reviewcaught))
    },


    async removeReview(reviewId) {
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

        const sal = await salons();
        const getSal = await sal.findOne(ObjectId(review.salonId));
        const salid = review.salonId;

        var demoTest
        var test
       
        if (getSal != null) {
            for (var i = 0; i < getSal.reviewId.length; i++) {
                demoTest = getSal.reviewId[i]
                if (demoTest == reviewId) {
                    test = demoTest
                    break;
                }
            }
        }
        if (test == null) {
            throw 'Review ID cannot be found'
        }

        const deleteInfo = await reviewCollection.removeOne({ _id: parsedId });
        if (deleteInfo.deletedCount === 0) throw `Could not delete review with id of ${parsedId}`;

        let SalUpdate = await sal.updateOne({ _id: ObjectID(review.salonId) }, { $pull: { reviewId: reviewId } })

        let updateCustomer = await customer();
        let custUpdate = await updateCustomer.updateOne({ _id: ObjectID(review.customersId) }, { $pull: { reviewId: reviewId } });
        console.log('looks okay now')
        const getSal1 = await sal.findOne(ObjectId(salid));

        var ReviewList = getSal1.reviewId
        console.log(ReviewList, 'ReviewList')
        var sum = 0;
        var demo = 0;

        if (ReviewList != null && ReviewList.length > 0) {
            for (var i = 0; i < ReviewList.length; i++) {
                var reviewcaught = await this.getReviewId(ReviewList[i]);
                demo = reviewcaught.rating + demo
                console.log(demo, 'demo from data delete')
            }
            console.log(demo, 'demo from data delete')
            var avgRating = Number(demo / (ReviewList.length).toFixed(2))
            console.log(avgRating, 'avgRating from data delete')
        }
        else {
            var avgRating = 0
        }
        await sal.updateOne({ _id: getSal._id }, { $set: { rating: avgRating } })
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