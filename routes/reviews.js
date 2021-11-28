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
router.get('/:salonId', async (req, res) => {
    if(!req.params.salonId)
    {
      res.status(400).json({ error: 'You must provide a valid Salon ID for review'});
      return;
    }
    try {
      const salonList = await reviewsData.getAll(req.params.salonId); 
      res.status(200).json(reviewList);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

//get using review id
  router.get('/:reviewId', async (req, res) => {
    if(!req.params.reviewId)
    {
      res.status(404).json({ error: 'You must provide a Review ID for review'})
      return;
    }
    try {
          const reviewList = await reviewsData.get(req.params.reviewId);
          res.status(200).json(reviewList);
      } catch (e) {
        res.status(404).json({message: e});
      }
    });

//get all reviews by a customer
    router.get('/:customersId' , async (req, res) => {
      if(!req.params.customersId)
    {
      res.status(404).json({ error: 'You must provide a Customer ID for review'})
      return;
    }
    try {
      const reviewList = await reviewsData.get(req.params.customersId);
      res.status(200).json(reviewList);
    }catch (e)
    {
      res.status(404).json({message: e});
    }
    })


    router.post('/reviews/:restaurantId', async (req, res) => {
  
      let reviewData = req.body;
      if(!req.params.restaurantId)
      {
        res.status(400).json({ error: 'You must provide a valid Restaurant ID for review'});
        return;
      }
      if (!reviewData.title) {
        res.status(400).json({ error: 'You must provide title for review'});
        return;
      }
      if (!reviewData.reviewer) {
        res.status(400).json({ error: 'You must provide a reviewer' });
        return;
      }
      if (!reviewData.rating) {
        res.status(400).json({ error: 'You must provide a rating' });
        return;
      }
      if (!reviewData.dateOfReview) {
        res.status(400).json({ error: 'You must provide a date for review' });
        return;
      }
      if (!reviewData.review) {
        res.status(400).json({ error: 'You must provide a review' });
        return;
      }
      try {
        const newPost = await reviewsData.create(
          req.params.restaurantId,
          reviewData.title,
          reviewData.reviewer,
          reviewData.rating,
          reviewData.dateOfReview,
          reviewData.review
        );
        //console.log(newPost+"For new Post")
        res.status(200).json(newPost);
      } catch (e) {
        res.status(400).json({ error: e });
      }
    });


    router.delete('/:reviewId', async (req, res) => {
      if (!req.params.reviewId) {
        res.status(400).json({ error: 'You must Supply an ID to delete' });
        return;
      }
      try {
        var reviewtoDelete = await reviewsData.get(req.params.reviewId);
      }catch(e)
      {
        res.json({message: e});
        return;
      }
      try{
        await reviewsData.remove(req.params.reviewId);
        res.status(200).json({ reviewId: reviewtoDelete._id , deleted: true });
      }catch (e) {
        res.status(404).json({ error: e });
        return;
      }
    });

module.exports = router;
    