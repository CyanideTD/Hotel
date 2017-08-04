var hotelsData = require('../data/hotel-data.json');

module.exports.getHotels = function (req, res) {
	console.log("Get all hotels");
	res
		.status(200)
		.json( hotelsData );
};