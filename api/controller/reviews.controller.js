var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getAllReviews = function(req, res) {
  var hotelId = req.params.hotelId;

  Hotel
  	.findById(hotelId)
  	.select('reviews')
  	.exec(function(err, doc) {
  	  var response = {
  	  	status : 200,
  	  	message : []
  	  }
  	  if (err) {
   		console.log("Error finding hotels");
   		response.status = 500;
   		response.message = err;
      } else if (!doc){
      	console.log("Hotel id not found in database", hotelId);
      	response.status = 404;
      	response.message = {
      		"message" : "Hotel ID not found " + id
      	};
      } else {
      	response.message = doc.reviews ? doc.reviews : [];
      }
      res
      	.status(response.status)
      	.json(response.message);
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
    	if (err) {
   		  console.log("Error finding hotels");
    	  res
    		.status(500)
    		.json(err);
    	} else {
    	  var review = doc.reviews.id(reviewId);
    	  res
    	    .json( review );
    	}
    })
};

var _addReview = function(req, res, hotel) {

  hotel.reviews.push({
  	name : req.body.name,
  	rating : parseInt(req.body.rating, 10),
  	review : req.body.review
  });

  hotel.save(function(err, hotelUpdated) {
  	if (err) {
  	  console.log("Error updating hotel");
  	  res
  	  	.status(500)
  	  	.json(err);
  	} else {
  	  console.log("Successfully updated");
  	  res
  	  	.status(201)
  	  	.json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
  	}
  })
}

module.exports.reviewsAddOne = function(req, res) {
  var hotelId = req.params.hotelId;

  Hotel
  	.findById(hotelId)
  	.select('reviews')
  	.exec(function(err, doc) {
  	  var response = {
  	  	status : 200,
  	  	message : []
  	  }
  	  if (err) {
   		console.log("Error finding hotels");
   		response.status = 500;
   		response.message = err;
      } else if (!doc){
      	console.log("Hotel id not found in database", hotelId);
      	response.status = 404;
      	response.message = {
      		"message" : "Hotel ID not found " + id
      	};
      }
      if (doc) {
      	_addReview(req, res, doc);
      } else {
      	res
      	.status(response.status)
      	.json(response.message);
      }
  	});
};

module.exports.reviewsUpdateOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;

  console.log("PUT reviewId " + reviewId + " from hotelId " + hotelId);

  Hotel
  	.findById(hotelId)
  	.select('reviews')
  	.exec(function(err, hotel) {
  		var thisReview;
  		var response = {
  			status : 200,
  			message : {}
  		};
  		if (err) {
  			console.log("Finding hotel error")
  			response.status = 200;
  			response.message = err;
  		} else if (!hotel) {
  			console.log("Hotel not Found in database", hotelId);
  			response.status = 404;
  			response.message = {"message" : "Hotel not Found" + hotelId};
  		} else {
  			thisReview = hotel.reviews.id(reviewId);
  			if (!thisReview) {
  				response.status = 404;
  				response.message = {"message" : "Review not Found " + reviewId};
  			}
  		}
  		if (response.status != 200) {
  			res
  			  .status(response.status)
  			  .json(response.message);
  		} else {
  		  thisReview.name = req.body.name;
  		  thisReview.rating = parseInt(req.body.rating, 10);
  		  thisReview.review = req.body.review;
  		  hotel.save(function(err, hotelUpdated) {
  		  	if (err) {
  		  	  res
  		  	  	.status(500)
  		  	  	.json(err);
  		  	} else {
  		  	  res
  		  	    .status(204)
  		  	    .json();
  		  	}
  		  });
  		}
  	});
};
