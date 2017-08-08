var mongoose = require('mongoose');

var userSchema = {
	username: {
		type: String,
		require: true,
		unique: true
	},
	name: {
		type: String,
	},
	password: {
		type: String,
		require: true
	}
}

mongoose.model('User', userSchema, 'users');