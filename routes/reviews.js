const { response } = require('express');
const express = require('express');
const { reviews } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const dataInfo = require("../data");
const customers = data.customers;
const salons = data.salons;
const comments = data.comments;

//Get data using salon id
router.get('/reviews/salons/:salonId', async (req, res) => {
  console.log(req.params.salonId, 'id from routes')
    if(!req.params.salonId)
    {
      res.status(400).json({ error: 'You must provide a valid Salon ID for review'});
      //res.status(400).render("reviews/error", "You must provide a valid Salon ID for review")
      return;
    }
    try {
      const salData = await salons.get(req.params.salonId)
      const salonList = await reviewsData.getAllreviewsofSalon(req.params.salonId); 
      console.log(salonList, 'SalonList')
      //res.status(200).json(salonList);
      console.log(salonList, 'salonList.reviewText')
      var demo1 = {}
      for(var i =0 ; i<salonList.length; i++){
        demo1[i] = salonList[i]
            console.log("demo3333333333333", demo1[i])

      }
      console.log(demo1, 'demo1')
      var test = Object.values(demo1)
      console.log(test, 'test')

      res.status(200).render("reviews/salonreview", {name: salData.name, reviews: test})
    } catch (e) {
      console.log('Hi I am savleen')
      //res.status(404).json({ error: e });
      res.status(400).render("reviews/error", { error: e })
    }
  });

//get using review id
  router.get('/:reviewId', async (req, res) => {
    if(!req.params.reviewId)
    {
      //res.status(404).json({ error: 'You must provide a Review ID for review'})
      res.status(400).render("reviews/error", "You must provide a Review ID for review")
      return;
    }
    try {//getReviewId
          //const reviewList = await reviewsData.getReviewById(req.params.reviewId);
          const reviewList = await reviewsData.getReviewId(req.params.reviewId);
          //console.log(reviewList, 'reviewList')
          const salData = await salons.get(reviewList.salonId)
          const custData = await customers.getCustomerById(reviewList.customersId)
          res.status(200).render("reviews/reviewbyid", {salonId : reviewList.salonId, name: salData.name, username: custData.username, customersId: reviewList.customersId,  reviewText: reviewList.reviewText, rating: reviewList.rating, _id: req.params.reviewId})
          //res.status(200).json(reviewList);
          //res.status(200).render("reviews/reviewbyid", )
      } catch (e) {
        res.status(404).render("reviews/error", { error: e})
        //res.status(404).json({message: e});
      }
    });

//check
    router.get('/reviews/alldata/:reviewId', async(req, res) => {
      try {
        const reviewList = await reviewsData.getReviewId(req.params.reviewId)
          //const salonsList = await salonsData.getAll();
          // res.status(200).json(salonsList)
          console.log("reviewList***", reviewList)
          //res.status(200).json(reviewList);
          //  res.status(200).render("reviews/reviewbyId", { message: "You have successfully signed up", name: reviewList });
          // res.status(200).render("reviews/reviewbyid", { message: "You have successfully signed up", name: reviewList });
          res.status(200).render("reviews/review", { reviewList });
      } catch (e) {
          res.status(404).json({ error: e });
      }
  });


//get all reviews by a customer
    router.get('/reviews/customer/:customersId' , async (req, res) => {
      if(!req.params.customersId)
    {
      // res.status(404).json({ error: 'You must provide a Customer ID for review'})
      res.status(404).render("reviews/error", { error: 'You must provide a Customer ID for review'})
      return;
    }
    try {
      //console.log('Hicdvfsgbd')
      const custData = await customers.getCustomerById(req.params.customersId)
      const reviewList = await reviewsData.getReviewsPerCustomer(req.params.customersId);
      //console.log(reviewList, 'reviewList')
      // res.status(200).json(reviewList);
      res.status(200).render("reviews/custReviews", {username: custData.username, reviews: reviewList});
    }catch (e)
    {
      //console.log('rgsnlb')
      res.status(404).render("reviews/error", { error: e})
      //res.status(404).json({message: e});
    }
    });

    router.get("/reviews/reviewforms/", async(req, res) => {
      // if (!req.session.AuthCookie) {
      //     res.status(401).redirect("/users/login");
      // } else {
      // try {
      //     const salonsList = await salonsData.getAll();
      //     console.log("salonsList***", salonsList)
      //         // const userLoggedIn = (req.session.AuthCookie) ? true : false;
      //         // res.status(200).render("", { restaurants: restaurantList, userLoggedIn: true })
      //     res.status(200).render("salons/salonsignup", { message: "You have p", salonsList: salonsList });
      // } catch (e) {
      //     console.log(e);
          // res.status(200).render("management", { restaurants: [], userLoggedIn: true })
      //}
      // }
      //const x = req.params._id
      try {
        //const reviewList = await reviewsData.getReviewId(x)
          //const salonsList = await salonsData.getAll();
          // res.status(200).json(salonsList)
          //console.log("reviewList***", reviewList)
          //res.status(200).json(reviewList);
           res.status(200).render("reviews/review");
      } catch (e) {
          res.status(404).json({ error: e });}
  });
  
//create a review

    router.post('/reviews/:salonId', async (req, res) => {
      console.log(req.params.salonId, 'req.paramss')
      console.log(req.body, 'req.body')
      let reviewData = req.body;
      console.log(reviewData, "reviewData")
      console.log(req.session, 'req.session')
      const user = req.session.user
      console.log(user, 'user: post review')
    
      // const salData = await salons.get(newPost.salonId)
      //   const custData = await customers.getCustomerById(newPost.customersId)
      // const redirectURL = "/salons/" + salonId;
      //   return res.redirect(redirectURL);
      
      // if(!req.params.salonId)
      // {
      //   res.status(400).json({ error: 'You must provide a valid Salon ID for review'});
      //   return;
      // }
      // if (!user.id) {
      //   res.status(400).json({ error: 'You must provide customer ID for review'});
      //   return;
      // }
      // if (!reviewData.reviewText) {
      //   res.status(400).json({ error: 'You must provide a reviewer' });
      //   return;
      // }
      // if (!reviewData.rating) {
      //   res.status(400).json({ error: 'You must provide a rating' });
      //   return;
      // }
      console.log(req.session.AuthCookie, 'req.session.AuthCookie')
    console.log(reviewData.rating, 'reviewData.rating')
    console.log(reviewData.reviewText, ' reviewText')
    console.log(user.id, 'user.id')
      try {
        const newPost = await reviewsData.create(
          req.params.salonId,
          user.id,
          reviewData.reviewText,
          reviewData.rating,
          //reviewData.rating
        );
        console.log(newPost, "For new Post")
        const salData = await salons.get(newPost.salonId)
          const custData = await customers.getCustomerById(newPost.customersId)
        // var test = (newPost._id).toString()
        // console.log(test, 'test')
        // res.redirect("/manage/test")
        res.status(200).render("reviews/salonreview", {salonId : newPost.salonId, name: salData.name, username: custData.username, customersId: newPost.customersId,  reviewText: newPost.reviewText, rating: newPost.rating, _id: req.params.reviewId });
      
        res.status(200).json(newPost);
       } catch (e) {
        res.status(400).render("reviews/error", { error: e})
        res.status(400).json({ error: e });
      }
    });

//delete review
    router.delete('/reviews/:reviewId', async (req, res) => {
      if (!req.params.reviewId) {
        res.status(400).json({ error: 'You must Supply an ID to delete' });
        return;
      }
      try {
        var reviewtoDelete = await reviewsData.getReviewById(req.params.reviewId);
      }catch(e)
      {
        res.json({message: e});
        return;
      }
      try{
        await reviewsData.removeReview(req.params.reviewId);
        res.status(200).json({ reviewId: reviewtoDelete._id , deleted: true });
      }catch (e) {
        res.status(404).json({ error: e });
        return;
      }
    });


    //update a review
    router.post('/reviews/updatereview/:reviewId', async (req, res) => {
      let RestInfo = req.body;
      if(!req.params.reviewId)
      {
        // res.status(400).json({error: 'You must provide id'});
        res.status(400).render("reviews/error", {error: 'You must provide id'});
        return;
      }
    
      if (!RestInfo) {
        // res.status(400).json({ error: 'You must provide data to update the review' });
        res.status(400).render("reviews/error", { error: 'You must provide data to update the review' });
        return;
      }
    
      if (!RestInfo.reviewText) {
        // res.status(400).json({ error: 'You must provide a text to update' });
        res.status(400).render("reviews/error", { error: 'You must provide a text to update' });
        return;
      }
    
      try {
        await reviewsData.getReviewId(req.params.reviewId);
      } catch (e) {
        // res.status(404).json({message: e})
        res.status(404).render("reviews/error", {error: e})
        return;
      }
      try {
        const updateSal = await reviewsData.update(req.params.reviewId, RestInfo.reviewText);
        console.log(updateSal, 'Update sal')
        // res.status(200).json(updateSal);
        res.status(200).render("reviews/editreview", {reviewId: req.params.reviewId, reviewText: updateSal.reviewText});

        
      } catch (e) {
        // res.status(404).json({message: e})
        res.status(404).render("reviews/error", {message: e})
      }
    });

    //like a review
    router.post('/like/:reviewId/:customersId', async function (req,res){
      const ReviewId = req.body.reviewId.trim() //xss(req.body.reviewId.trim());
      const customersId = req.body.customersId.trim() //xss(req.body.customersId.trim());
      const parsedreviewId = ObjectId(ReviewId);
      const parsedcustomersId = ObjectId(customersId);
      const review = await reviewsData.getReviewById(ReviewId);
      const update = await reviewsData.updateReviewLike(ReviewId, customersId, 1)//(review.likes.includes(customersId))? null : true);
      const updatedRev = await reviewsData.getReviewId(ReviewId);
  
      res.status(200).json({
          Upvoted: updatedRev.upvote.length.toString(),
          //dislikeNum: updatedRev.downvote.length.toString(),
          success: true
      });
  })
  
  //dislike a review
  router.post('/dislike/:reviewId/:customersId', async function (req,res){
      const ReviewId = req.body.reviewId.trim()//xss(req.body.reviewId.trim());
      const customersId = req.body.customersId.trim() //xss(req.body.customersId.trim());
      const parsedreviewId = ObjectId(ReviewId);
      const parsedcustomersId = ObjectId(customersId);
      const review = await reviewsData.getReviewById(ReviewId);
      const update = await reviewsData.updateReviewLike(ReviewId, customersId, 0)//(review.dislikes.includes(customersId))? null : false);
      const updatedRev = await reviewsData.getReviewId(ReviewId);
  
      res.status(200).json({
          //likeNum: updatedRev.upvote.length.toString(),
          Downvoted: updatedRev.downvote.length.toString(),
          success: true
      });
  })


module.exports = router;
    