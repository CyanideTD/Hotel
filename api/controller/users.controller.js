var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');

module.exports.register = function(req, res) {
	console.log('registering user');
	var username = req.body.username;
	var name = req.body.name || null;
	var password = req.body.password;

	User.create({
		username: username,
		name : name,
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	}, function (err, user) {
		if (err) {
			res
				.status(400)
				.json(err);
		} else {
			console.log("user created " + user);
			res
				.status(201)
				.json(user);
		}
	});
};

module.exports.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User
		.findOne({
			username: username,
		})
		.exec(function(err, user) {
			if (err) {
				console.log(err);
				res
					.status(400)
					.json(err);
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					console.log('User found');
					res
						.status(200)
						.json(user);
				} else {
					res
						.status(401)
						.json("Unauthorized");
				}
			}
		})
};