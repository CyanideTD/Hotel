var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
  var lat = parseFloat(req.query.lat);
  var lng = parseFloat(req.query.lng);
  var num = 5;
  var rad = 2000;

  if (req.query.num) {
  	num = parseInt(req.query.num, 10);
  }

  if (req.query.rad) {
  	rad = parseInt(req.query.rad, 10);
  }

  var point = {
  	type : "Point",
  	coordinates : [lng, lat]
  }

  var geoOptions = {
  	spherical : true,
  	maxDistance : rad,
  	num : num
  };

  Hotel
    .geoNear(point, geoOptions, function(err, results, stats) {
    	console.log("Geo results: ", results);
    	console.log("Geo stats: ",  stats);
    	res
    	  .status(200)
    	  .json(results);
    });
}

module.exports.getHotels = function (req, res) {

  console.log("Get all hotels");
  console.log(req.query);

  var offsets = 0;
  var counts = 5;
  var maxCount = 10;

  if (req.query && req.query.lat && req.query.lng) {
  	runGeoQuery(req, res);
  	return;
  }

  if (req.query && req.query.offset) {
  	offsets = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
  	counts = parseInt(req.query.count, 10);
  }

  if (isNaN(offsets) || isNaN(counts)) {
  	res
  	  .status(400)
  	  .json({ "Message" : "invalid input" });
  	return;
  }

  if (counts > maxCount) {
  	res
  	  .status(400)
  	  .json({ "Message" : "Exceed the limits" });
  	return;
  }

  Hotel
    .find()
    .skip(offsets)
    .limit(counts)
    .exec(function(err, hotels) {
    	if (err) {
   		  console.log("Error finding hotels");
    	  res
    		.status(500)
    		.json(err);
    	} else {
    	  console.log("Found hotels " + hotels.length);
    	  res
    	    .json(hotels);
    	}
    });
};

module.exports.hotelsGetOne = function (req, res) {
  var hotelId = req.params.hotelId;
  console.log("Get Hotel " + hotelId);

  Hotel
  	.findById(hotelId)
  	.exec(function(err, doc) {

  	  var response = {
  	  	status : 200,
  	  	message : doc
  	  }

  	  if (err) {
   		console.log("Error finding hotels");
   		response.status = 500;
   		response.message = err;
      } else if (!doc) {
      	response.status = 404;
      	response.message = {"message" : "Hotel ID not found"};
      }
      res
      	.status(response.status)
      	.json(response.message);
  	});
};

module.exports.addHotel = function (req, res) {
  var db = dbconn.get();
  var collection = db.collection('hotelInfo');
  var newHotel;
  console.log("Post new Hotel");
  
  if (req.body && req.body.name && req.body.stars) {
  	newHotel = req.body;
  	newHotel.stars = parseInt(newHotel.stars, 10);
  	collection.insertOne(newHotel, function (err, response) {
  	  console.log(response);
  	  console.log(response.ops);
  	  res
  	  	.status(201)
  	  	.json(response.ops);
  	});
  } else {
  	console.log("Data missing from body");
  	res
  	  .status(400)
  	  .json( {message : "missing request body"} );
  }
}