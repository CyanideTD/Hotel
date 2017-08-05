var mongoose = require('mongoose');

var hotelModel = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	stars : {
		type : Number,
		min : 0,
		max : 5,
		"default" : 0
	},
	services : [String],
	description : String,
	photos : [String],
	currency : String
});

mongoose.model('Hotel', hotelSchema, 'hotelInfo');