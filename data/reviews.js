const mongoCollections = require('../config/mongoCollections')
let { ObjectID } = require("mongodb");
//const { customers } = require('.');
const reviews = mongoCollections.reviews;
const salons = mongoCollections.salons;
const customer = mongoCollections.customers;
//const validchecking = require('./validchecking');
 
 
module.exports = {
   async create(salonId, customersId, reviewText, rating) //, comments, upvote, downvote)
   {
     salonId = salonId.toString();
     customersId = customersId.toString();
       if(typeof salonId!= 'string') throw 'No Salon with proper type has been provided'
       if(salonId == null || salonId.length == 0) throw 'No Salon has been selected'
       if(salonId.trim()=='') throw 'Salon Id provided contains only empty spaces'
 
       if(customersId == null || customersId.length == 0) throw 'Customer ID has not been entered for Review'
       if(typeof customersId!= 'string') throw 'No customer with proper type has been provided'
       if(customersId.trim() == '') throw 'Customer ID is provided contains only empty spaces'
 
       if(typeof reviewText!='string') throw 'Review is not of appropriate type'
       if(reviewText == null || reviewText.length == 0) throw 'Review is not provided'
       if(reviewText.trim() == '') throw 'Review provided only contains blank spaces'
 
       if(typeof rating!= 'number') throw 'Rating provided is not a number'
       if(rating.length == 0 || rating == null) throw 'Rating is not provided'
       if(rating <= 0 || rating >= 10) throw 'Rating must be between 0-10'
 
      //  if(comments)
      //  {
      //      if(comments.length == 0 || comments == null) throw 'Comments are not provided'
      //      if(comments.trim() == '') throw 'Only Blank spaces are provided in Comments'
      //      if(typeof comments!= 'string') throw 'Comments are not of appropriate type'
 
      //  }
 
       const reviewCollection = await reviews();
       const sal = await salons();

       const cust = await customer();
 
       let { ObjectId } = require('mongodb');
       let newObjId = ObjectId();
       if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
       let x = newObjId.toString();
       let parsedId = ObjectId(salonId);
 
       const checkSal = await sal.findOne({_id: parsedId})
       if (checkSal === null) throw 'No Salon is present with that id'

       let parsedId1 = ObjectId(customersId);
       const checkCust = await cust.findOne({_id: parsedId1})
       if (checkCust === null) throw 'No Customer is present with that id'
 
       let newReview = {
           _id: ObjectId(),
           salonId: salonId,
           customersId: customersId,
           reviewText: reviewText,
           rating: rating,
           //comments: comments
       }

       const insertInfo = await reviewCollection.insertOne(newReview);
       if (insertInfo.insertedCount === 0) throw 'Could not add new Review';
 
       console.log(newReview, 'newReview')
       var demo
       var sum = 0
       const OverallRatingNew = await sal.updateOne({_id: parsedId},{$addToSet:{reviews: newReview} })
       //console.log(OverallRatingNew, 'Overall new rating')

 
       const reviewofOneSal = await sal.findOne({ _id: parsedId });
       console.log(reviewofOneSal, 'Review of one sal')
 
       if(reviewofOneSal){
           var ReviewList = reviewofOneSal.reviews
           console.log(ReviewList, 'Review list')
           for(var i =0; i<ReviewList.length; i++)
           {
             demo = ReviewList[i].rating
             sum = sum + demo
 
           }
           console.log(sum, 'sum')
         //var newSum = sum + rating
         var newLength = ReviewList.length
         //console.log(newLength,'newLength')
         var newOverallRating = Number((sum/newLength).toFixed(2));
             console.log(newOverallRating, 'new overall rating')
       }
       else{
           var newOverallRating = rating
       }
 
       let updateCustomer = await customer();
       let custUpdate = await updateCustomer.updateOne({_id:ObjectID(newReview.customersId)},{ $push: { reviewId: (newReview._id).toString()}});
       //console.log(custUpdate, 'Custupdate')

       
       let updateSal = await salons();
      let SalUpdate = await updateSal.updateOne({_id:ObjectID(newReview.salonId)},{ $push: { reviewId: (newReview._id).toString()}})
      let SalUpdate1 = await updateSal.updateOne({_id:ObjectID(newReview.salonId)},{ $set: { rating: newOverallRating}})

       //console.log(SalUpdate, 'Sal update')
  
       //await reviewCollection.updateOne({_id: parsedId},{$set: {overallRating: newOverallRating}});
  
       return JSON.parse(JSON.stringify(newReview))
 
 
   },
 
//all reviews of one salon
   async getAll(salonId){
       if(salonId==null || salonId.length==0) throw 'You must provide a Salon ID '
       if (typeof salonId !== 'string') throw 'Not valid type of SalonID provided';
       if(salonId.trim()=='') throw 'Blank spaces are provided in SalonID'
 
       let { ObjectId } = require('mongodb');
       let newObjId = ObjectId();
       if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
       let x = newObjId.toString();
       let parsedId = ObjectId(salonId);
 
       const reviewCollection = await reviews();
 
       const AllReviewsofaSal = await reviewCollection.findOne({ _id: parsedId});
       if(AllReviewsofaSal==null) throw 'Salon ID is not present'
 
       var ReviewList = AllReviewsofaSal.reviews
       if (!ReviewList) throw 'Reviews of this salon not found';
       return JSON.parse(JSON.stringify(ReviewList));
 
     },
 
 
     //get review by customer
     async getReviewsPerCustomer(customersId){
       customersId = customersId.toString();
       if(!customersId) throw "Pass id to fetch the data";
       if(typeof customersId !== 'string' || customersId.length === 0 || customersId.length !== 24) throw "The id should be an non empty string";
 
       const reviewCollection = await reviews();
       const reviewList = await reviewCollection.find({'customersId':customersId}).toArray();
 
       if(!reviewList) throw "No Reviews in the system for this customer";
       reviewList.forEach((val) => {
           val._id = (val._id).toString();
       })
 
       return reviewList;
   },
 
 
   //get review by id
   async getReviewById(reviewId) {
       // reviewId = reviewId.toString();
       // if(!reviewId) throw "ID not supplied to fetch the review";
       // if(typeof reviewId !== 'string' || reviewId.length === 0 || id.length !== 24) throw "Id provided consist only blank spaces";
       // let parsedID = ObjectID(reviewId);
  
       // const reviewCollection = await reviews();
       // const review = await reviewCollection.findOne(parsedID);
       // if(!review) throw 'Review not found';
       // review._id = (review._id).toString();
       // return review;
 
       if(reviewId==null || reviewId.length==0) throw 'Reviw ID is null'
       if(typeof reviewId!='string') throw 'Review ID is not of proper type'
       if(reviewId.trim()=='') throw 'Blank spaces are provided in Review Id'
 
       let { ObjectId } = require('mongodb');
       let newObjId = ObjectId();
       if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
       let x = newObjId.toString();
       let parsedId = ObjectId(reviewId);
 
       const sal = await salons();
      
       const reviewofOneSal = await sal.findOne({ "reviews._id": parsedId });
       if(!reviewofOneSal) throw 'No review found with the supplied review ID'
 
       let demo = {}
       let count = 0;
       for( var i=0; i<reviewofOneSal.reviews.length; i++)
       {
         if(reviewofOneSal.reviews[i]._id == reviewId)
         {
           demo = reviewofOneSal.reviews[i]
           count = 1
           break
         }
       }
  
       if (count ==0) throw 'Review not found';
       return demo;
  
   },
 
 
   async removeReview(reviewId)
   {
       if(reviewId==null || reviewId.length==0) throw 'Reviw ID is null'
       if(typeof reviewId!='string') throw 'Review ID is not of proper type'
       if(reviewId.trim()=='') throw 'Blank spaces are provided in Review Id'
 
       let { ObjectId } = require('mongodb');
       let newObjId = ObjectId();
       if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
       let x = newObjId.toString();
       let parsedId = ObjectId(reviewId);
 
       const sal = await salons();
       const reviewofOneSal = await sal.findOne({ "reviews._id": parsedId });
       if (!reviewofOneSal) throw 'No Review is present with that id'
 
       const DeleteReview = await sal.updateOne(
         {_id: reviewofOneSal._id},
         {$pull:{reviews:{_id:parsedId}}}
       );
 
       if (!DeleteReview.matchedCount && !DeleteReview.modifiedCount) throw 'Update failed';
 
       let newOverallRating = 0
       if(reviewofOneSal!=null && reviewofOneSal.reviews!= null && reviewofOneSal.reviews.length>0)
       {
         var sum = 0;
         var demo
         var ReviewList = reviewofOneSal.reviews
         //console.log(ReviewList.length)
         for(var i =0; i<ReviewList.length; i++)
         {
           if(ReviewList[i]._id != reviewId){
             //console.log(ReviewList[i]._id, 'ReviewList[i]._id')
           demo = ReviewList[i].rating
           //console.log(demo,'demo')
           sum = sum + demo
           }
         }
         //console.log(sum,'sum')
         newOverallRating = Number((sum/(ReviewList.length-1)).toFixed(2));
         //console.log(newOverallRating)
       }
       else{
         //console.log('Hi checking for 0')
         newOverallRating = 0
       }
  
       await sal.updateOne({_id: reviewofOneSal._id},{$set: {overallRating: newOverallRating}});
 
 
 
       let updateCustomer = await customer();
       let custUpdate = await updateCustomer.updateOne({_id:ObjectID(newReview.customersId)},{ $push: { reviews: (newReview._id).toString()}});
 
       let updateSal = await salons();
       let SalUpdate = await updateSal.updateOne({_id:ObjectID(newReview.salonId)},{ $push: { reviews: (newReview._id).toString()}})
 
 
 
       return {deleted: true};
   },
 
 
   async update(id, reviewText)
   {
     id = id.toString();
     if(!id) throw 'ID not provided';
     if(typeof id !== 'string' || id.length === 0) throw 'Id should be a non empty string';
     if(id.length !== 24) throw 'Not a valid ID';
     let parsedID = ObjectID(id);
     //console.log("hello0");
    
     if(!reviewText) throw "Review not provided";
 
     if((reviewText).length !== 0){
         const reviewCollection = await reviews();





         const updatedInfo = await reviewCollection.updateOne({_id: parsedID}, {$set: {reviewText: reviewText}});
 
         if(!updatedInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
     }
     return await this.getReviewById(id);
  }
  
 
}
