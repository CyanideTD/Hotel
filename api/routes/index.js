var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controller/hotel.controller.js');
var ctrlReviews = require('../controller/reviews.controller.js');

router
  .route('/hotels')
  .get(ctrlHotels.getHotels);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.addHotel);

// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.getAllReviews);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.getOneReview);

module.exports = router;
