var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controller/hotel.controller.js');

router
  .route('/hotels')
  .get(ctrlHotels.getHotels);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.addHotel);

module.exports = router;
