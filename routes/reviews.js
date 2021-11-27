const express = require('express');
const { reviews } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const dataInfo = require("../data");
const customers = data.customers;
const salons = data.salons;
const comments = data.comments;


router.get('/reviews/:salonId', async (req, res) => {
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


  router.get('/reviews/review/:reviewId', async (req, res) => {
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


    