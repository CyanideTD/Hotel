var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getAllReviews = function(req, res) {
  var hotelId = req.params.hotelId;

  Hotel
  	.findById(hotelId)
  	.select('reviews')
  	.exec(function(err, doc) {
  		console.log('Get all reviews of ' + hotelId);
  		res
  		  .status(201)
  		  .json(doc.reviews);
  	});
};

module.exports.getOneReview = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;

  console.log("Get reviewId " + reviewId + " from hotelId" + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
    	var review = doc.reviews.id(reviewId);
    	res
    	  .json( review );
    })


};
