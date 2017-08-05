var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelsData = require('../data/hotel-data.json');

module.exports.getHotels = function (req, res) {
  
  var db = dbconn.get();
  var collection = db.collection('hotelInfo');
  console.log("db", db);

  console.log("Get all hotels");
  console.log(req.query);

  var offsets = 0;
  var counts = 5;

  if (req.query && req.query.offset) {
  	offsets = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
  	counts = parseInt(req.query.count, 10);
  }

  collection
  	.find()
  	.skip(offsets)
  	.limit(counts)
  	.toArray(function (err, docs) {
  	  if (err) {
  	  	console.log("Connection err: ", err);
  	  }
  	  res
  	  	.status(200)
  	  	.json(docs);
  	});
};

module.exports.hotelsGetOne = function (req, res) {
  var hotelId = req.params.hotelId;
  console.log("Get Hotel " + hotelId);
  var db = dbconn.get();
  var collection = db.collection('hotelInfo');
  collection
  	.findOne({
  		"_id" : ObjectId(hotelId)
  	}, function(err, doc) {
  	  res
		.status(200)
		.json( doc );
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