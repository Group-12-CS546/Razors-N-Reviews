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
router.get('/reviews/salons/:salonId', async(req, res) => {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    console.log(req.params.salonId, 'id from routes')
    if (!req.params.salonId) {
        //res.status(400).json({ error: 'You must provide a valid Salon ID for review'});
        res.status(400).render("reviews/error", { message: "You must provide a valid Salon ID for review" })
        return;
    }
    if (req.params.salonId == null || req.params.salonId.length == 0) {
        res.status(400).render("reviews/error", { message: "You must provide a Salon Id that is not null for review" })
        return;
    }
    if (req.params.salonId.trim() == '') {
        res.status(400).render("reviews/error", { message: "Blank spaces are provided in SalonID" })
        return;
    }
    try {
        const salData = await salons.get(req.params.salonId)
        const salonList = await reviewsData.getAllreviewsofSalon(req.params.salonId);
        //console.log(salonList, 'SalonList')
        //res.status(200).json(salonList);
        //console.log(salonList, 'salonList.reviewText')
        var demo1 = {}
        for (var i = 0; i < salonList.length; i++) {
            demo1[i] = salonList[i]
                //console.log("demo3333333333333", demo1[i])

        }
        //console.log(demo1, 'demo1')
        var test = Object.values(demo1)
            //console.log(test, 'test')

        // res.status(200).render("reviews/salonreview", {test: test}) //{name: salData.name, reviews: test})
        res.status(200).render("salons/salonprofile", { test: test })
    } catch (e) {
        //console.log('Hi I am savleen')
        //res.status(404).json({ error: e });
        res.status(400).render("reviews/error", { message: e })
    }
});

//get using review id
router.get('/:reviewId', async(req, res) => {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    if (!req.params.reviewId) {
        //res.status(404).json({ error: 'You must provide a Review ID for review'})
        res.status(400).render("reviews/error", { message: "You must provide a Review ID for review" })
        return;
    }
    try { //getReviewId
        //const reviewList = await reviewsData.getReviewById(req.params.reviewId);
        const reviewList = await reviewsData.getReviewId(req.params.reviewId);
        //console.log(reviewList, 'reviewList')
        const salData = await salons.get(reviewList.salonId)
        const custData = await customers.getCustomerById(reviewList.customersId)
        res.status(200).render("reviews/reviewbyid", { salonId: reviewList.salonId, name: salData.name, username: custData.username, customersId: reviewList.customersId, reviewText: reviewList.reviewText, rating: reviewList.rating, _id: req.params.reviewId })
            //res.status(200).json(reviewList);
            //res.status(200).render("reviews/reviewbyid", )
    } catch (e) {
        res.status(404).render("reviews/error", { message: e })
            //res.status(404).json({message: e});
    }
});

//check
router.get('/reviews/alldata/:reviewId', async(req, res) => {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    if (!req.params.reviewId) {
        //res.status(404).json({ error: 'You must provide a Review ID for review'})
        res.status(400).render("reviews/error", { message: "You must provide a Review ID for review" })
        return;
    }
    try {
        const reviewList = await reviewsData.getReviewId(req.params.reviewId)
            //const salonsList = await salonsData.getAll();
            // res.status(200).json(salonsList)
            //console.log("reviewList***", reviewList)
            //res.status(200).json(reviewList);
            //  res.status(200).render("reviews/reviewbyId", { message: "You have successfully signed up", name: reviewList });
            // res.status(200).render("reviews/reviewbyid", { message: "You have successfully signed up", name: reviewList });
        res.status(200).render("reviews/review", { reviewList });
    } catch (e) {
        //res.status(404).json({ error: e });
        res.status(404).render("reviews/error", { message: e })
    }
});


//get all reviews by a customer
router.get('/reviews/customer/:customersId', async(req, res) => {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    if (req.params.customersId.length === 0 || req.params.customersId.length !== 24) {
        res.status(404).render("reviews/error", { message: 'Customer id should be a non empty string' })
        return;
    }

    console.log(req.session, 'req.session')
    console.log(session_user_id, 'session_user_id form review route')
    const user = session_user_id
    console.log(user, 'user: post review')
    if (!req.params.customersId) {
        // res.status(404).json({ error: 'You must provide a Customer ID for review'})
        res.status(404).render("reviews/error", { message: 'You must provide a Customer ID for review' })
        return;
    }
    try {
        //console.log('Hicdvfsgbd')
        const custData = await customers.getCustomerById(user)
        const reviewList = await reviewsData.getReviewsPerCustomer(req.params.customersId);
        //console.log(reviewList, 'reviewList')
        // res.status(200).json(reviewList);
        // res.status(200).render("reviews/custReviews", {username: custData.username, reviews: reviewList});
        res.status(200).render("users/private", { reviewList: reviewList });
    } catch (e) {
        //console.log('rgsnlb')
        res.status(404).render("reviews/error", { message: e })
            //res.status(404).json({message: e});
    }
});


//na for now
router.get("/reviews/reviewforms/", async(req, res) => {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
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
        res.status(404).json({ error: e });
    }
});

//create a review

router.post('/reviews/:salonId', async(req, res) => {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    // console.log(req.params.salonId, 'req.paramss')
    // console.log(req.body, 'req.body')
    let reviewData = req.body;
    // console.log(reviewData, "reviewData")
    // console.log(req.session, 'req.session')
    const user = req.session.user
        // console.log(user, 'user: post review')

    if (!req.params.salonId || req.params.salonId.length == 0 || req.params.salonId.trim() == '') {
        res.status(400).render("reviews/error", { message: 'You must provide a valid Salon ID for review' });
        return;
    }
    if (typeof req.params.salonId != 'string') {
        res.status(400).render("reviews/error", { message: 'No Salon with proper type has been provided' });
        return;
    }
    // if (!user.id) {
    //   res.status(400).json({ error: 'You must provide customer ID for review'});
    //   return;
    // }
    if (!reviewData.reviewText || reviewData.reviewText.trim() == '' || reviewData.reviewText == null) {
        res.status(400).render("reviews/error", { message: 'You must provide a review' });
        return;
    }
    if (typeof reviewData.reviewText != 'string') {
        res.status(400).render("reviews/error", { message: 'You must provide a string for review' });
        return;
    }
    if (!reviewData.rating) {
        res.status(400).render("reviews/error", { message: 'You must provide a rating' });
        return;
    }
    if (reviewData.rating < 1 || reviewData.rating > 11) {
        res.status(400).render("reviews/error", { message: 'Rating cannot be less than 1 or greater than 10' });
        return;
    }
    //console.log(req.session.AuthCookie, 'req.session.AuthCookie')
    //console.log(reviewData.rating, 'reviewData.rating')
    //console.log(reviewData.reviewText, ' reviewText')
    //console.log(user.id, 'user.id')
    try {
        const newPost = await reviewsData.create(
            req.params.salonId,
            user.id,
            reviewData.reviewText,
            reviewData.rating,
            //reviewData.rating
        );
        //console.log(newPost, "For new Post")
        const salData = await salons.get(newPost.salonId)
        const custData = await customers.getCustomerById(newPost.customersId)
            // var test = (newPost._id).toString()
            // console.log(test, 'test')
            // res.redirect("/manage/test")
        res.status(200).render("reviews/salonreview", { salonId: newPost.salonId, name: salData.name, username: custData.username, customersId: newPost.customersId, reviewText: newPost.reviewText, rating: newPost.rating, _id: req.params.reviewId });
        // res.status(200).json(newPost);
    } catch (e) {
        res.status(400).render("reviews/error", { message: e })
            //res.status(400).json({ error: e });
    }
});

//delete review
router.get('/reviews/deletereview/:reviewId', async(req, res) => {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    if (!req.params.reviewId) {
        // res.status(400).json({ error: 'You must Supply an ID to delete' });
        res.status(400).render("reviews/error", { message: 'You must Supply an ID to delete' });
        return;
    }
    // console.log(req.session, 'req.session')
    const user = req.session.user
        // console.log(user, 'user: post review')
        // console.log("hi from get")
    try {
        var reviewtoDelete = await reviewsData.getReviewId(req.params.reviewId);
        // console.log(reviewtoDelete, 'reviewtoDelete from delete get route')
        if (user.id != reviewtoDelete.customersId) {
            res.status(400).render("reviews/error", { message: "You cant delete this review as you did not post it!" })
        } else {
            const deletereview = await reviewsData.removeReview(req.params.reviewId);
            res.status(200).render('reviews/deletereview', { message: 'Deleted your review successfully' })
                // console.log("successfully deleted")
        }
    } catch (e) {
        res.status(404).render("reviews/error", { message: e });
    }
});


//get to edit the review
router.get('/reviews/updatereview/:reviewId', async(req, res) => {
    //console.log(req.body, 'req.body from get')
    // console.log(req.params.reviewId, 'id from get')
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    // let RestInfo = req.body;
    // if (!req.params.reviewId) {
    //   res.status(400).json({ error: 'You must Supply an ID to edit' });
    //   return;
    // }
    // if (!RestInfo.reviewText) {
    //   // res.status(400).json({ error: 'You must provide a text to update' });
    //   res.status(400).render("reviews/error", { error: 'You must provide a text to update' });
    //   return;

    // }
    // console.log(req.session, 'req.session')
    const user = req.session.user
        // console.log(user, 'user: post review')
        // console.log("hi from get")
    try {
        const testreview = await reviewsData.getReviewId(req.params.reviewId)
            // console.log(testreview, 'testreview')
        if (user.id != testreview.customersId) {
            res.status(400).render("reviews/error", { message: "You can't edit this review as you did not post it!" })
                // return;
        } else {
            res.status(200).render('reviews/editreview', { id: testreview._id, testreview: testreview.reviewText })
        }
        //const testreview = await reviewsData.getReviewId(RestInfo.reviewId);

        //let updatereview = await reviewsData.update(req.params.reviewId, RestInfo.reviewText)
        //console.log(updatereview, 'updatereview')
        // res.status(200).render('reviews/editreview', {id: testreview._id ,testreview: testreview.reviewText})
    } catch (error) {
        // console.log(error, 'error')
        res.status(400).render("reviews/error", { message: error })
    }
})


//update a review
router.post('/reviews/updatereview/:reviewId', async(req, res) => {
    // console.log(req.params.reviewId, 'id from post')
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    // console.log(req.body, 'req.body from post')
    let RestInfo = req.body;
    if (!req.params.reviewId) {
        // res.status(400).json({error: 'You must provide id'});
        res.status(400).render("reviews/error", { message: 'You must provide id' });
        return;
    }

    if (!RestInfo) {
        // res.status(400).json({ error: 'You must provide data to update the review' });
        res.status(400).render("reviews/error", { message: 'You must provide data to update the review' });
        return;
    }

    if (!RestInfo.reviewText) {
        // res.status(400).json({ error: 'You must provide a text to update' });
        res.status(400).render("reviews/error", { message: 'You must provide a text to update' });
        return;
    }

    try {
        await reviewsData.getReviewId(req.params.reviewId);
    } catch (e) {
        // res.status(404).json({message: e})
        res.status(404).render("reviews/error", { error: e })
        return;
    }
    try {
        const updateSal = await reviewsData.update(req.params.reviewId, RestInfo.reviewText);
        // console.log(updateSal, 'Update sal')
        // res.status(200).json(updateSal);
        res.status(200).render("reviews/editreview", { message: "Updated your review successfully", updateSal: updateSal });
    } catch (e) {
        // res.status(404).json({message: e})
        res.status(404).render("reviews/error", { message: e })
    }
});

//like a review
router.post('/like/:reviewId/:customersId', async function(req, res) {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    const ReviewId = req.body.reviewId.trim() //xss(req.body.reviewId.trim());
    const customersId = req.body.customersId.trim() //xss(req.body.customersId.trim());
    const parsedreviewId = ObjectId(ReviewId);
    const parsedcustomersId = ObjectId(customersId);
    const review = await reviewsData.getReviewById(ReviewId);
    const update = await reviewsData.updateReviewLike(ReviewId, customersId, 1) //(review.likes.includes(customersId))? null : true);
    const updatedRev = await reviewsData.getReviewId(ReviewId);

    res.status(200).json({
        Upvoted: updatedRev.upvote.length.toString(),
        //dislikeNum: updatedRev.downvote.length.toString(),
        success: true
    });
})

//dislike a review
router.post('/dislike/:reviewId/:customersId', async function(req, res) {
    if (!req.session.AuthCookie) {
        res.redirect("/");
    }
    const ReviewId = req.body.reviewId.trim() //xss(req.body.reviewId.trim());
    const customersId = req.body.customersId.trim() //xss(req.body.customersId.trim());
    const parsedreviewId = ObjectId(ReviewId);
    const parsedcustomersId = ObjectId(customersId);
    const review = await reviewsData.getReviewById(ReviewId);
    const update = await reviewsData.updateReviewLike(ReviewId, customersId, 0) //(review.dislikes.includes(customersId))? null : false);
    const updatedRev = await reviewsData.getReviewId(ReviewId);

    res.status(200).json({
        //likeNum: updatedRev.upvote.length.toString(),
        Downvoted: updatedRev.downvote.length.toString(),
        success: true
    });
})


module.exports = router;