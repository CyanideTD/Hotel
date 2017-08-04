var hotelsData = require('../data/hotel-data.json');

module.exports.getHotels = function (req, res) {
	console.log("Get all hotels");
	res
		.status(200)
		.json( hotelsData );
};

module.exports.hotelsGetOne = function (req, res) {
	var hotelId = req.params.hotelId;
	console.log("Get Hotel " + hotelId);
	var hotel = hotelsData[hotelId];
	res
		.status(200)
		.json( hotel );
};