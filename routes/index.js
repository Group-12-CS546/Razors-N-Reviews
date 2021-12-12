const commentsRoutes = require('./comments');
const covidReviewsRoutes = require('./covidReviews');
const customersRoutes = require('./customers');
const reviewsRoutes = require('./reviews');
const salonsRoutes = require('./salons');

const constructorMethod = (app) => {
    app.use('/comments', commentsRoutes);
    app.use('/covidReviews', covidReviewsRoutes);
    app.use('', customersRoutes);
    app.use('/reviews', reviewsRoutes);
    app.use('/', salonsRoutes);

    app.use('*', (req, res) => {
        console.log('here')
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;