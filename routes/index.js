// const commentsRoutes = require('./comments');
// const covidReviewsRoutes = require('./covidReviews');
const customersRoutes = require('./customers');
// const reviewsRoutes = require('./reviews');
const salonsRoutes = require('./salons');

const constructorMethod = (app) => {
    // app.use('', commentsRoutes);
    // app.use('', covidReviewsRoutes);
    app.use('', customersRoutes);
    // app.use('', reviewsRoutes);
    app.use('', salonsRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;