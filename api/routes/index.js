var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controller/hotel.controller.js');
var ctrlReviews = require('../controller/reviews.controller.js');

router
  .route('/hotels')
  .get(ctrlHotels.getHotels)
  .post(ctrlHotels.addHotel);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelUpdateOne)
  .delete(ctrlHotels.hotelDeleteOne);

// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.getAllReviews)
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.getOneReview)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
