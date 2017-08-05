var dbconn = require('../data/dbconnection.js');
var hotelsData = require('../data/hotel-data.json');

module.exports.getHotels = function (req, res) {
  
  var db = dbconn.get();
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

  var returnData = hotelsData.slice(offsets, offsets + counts);

  res
	.status(200)
	.json( returnData );
};

module.exports.hotelsGetOne = function (req, res) {
  var hotelId = req.params.hotelId;
  console.log("Get Hotel " + hotelId);
  var hotel = hotelsData[hotelId];
  res
	.status(200)
	.json( hotel );
};

module.exports.addHotel = function (req, res) {
  console.log("Post new Hotel");
  console.log(req.body);
  res
  	.status(200)
  	.json(req.body);
}