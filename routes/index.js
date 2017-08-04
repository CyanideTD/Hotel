var express = require('express');
var router = express.Router();

router
	.route('/json')
	.get(function(req, res) {
		console.log("Get json")
		res
			.status(200)
			.json( {"jsonData" : true} )
	})
	.post(function(req, res) {
		console.log("post json")
		res
			.status(200)
			.json( {"POST jsonData" : true} )
	})


module.exports = router;
