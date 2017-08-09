angular.module('hotel').controller('HotelController', HotelController);

function HotelController($route, hotelDataFactory, $routeParams, AuthFactory, jwtHelper, $window) {
	var vm = this;
	var id = $routeParams.id;
	hotelDataFactory.hotelDisplay(id).then(function(response) {
		vm.hotel = response.data;
		vm.stars = _getStarRating(response.data.stars);
		console.log(vm.hotel);
	});

	function _getStarRating(stars) {
		return new Array(stars);
	};

	vm.isLoggedIn = function() {
		return AuthFactory.isLoggedIn;
	}

	vm.addReview = function() {

		var token = jwtHelper.decodeToken($window.sessionStorage.token);
		var username = token.username;

		var postData = {
			name : username,
			rating : vm.rating,
			review : vm.review
		};

		if (vm.reviewForm.$valid) {
			hotelDataFactory.postReview(id, postData).then(function(response) {
				console.log(response.data);
				if (response.status == 200) {
					$route.reload();
				}
			}).catch(function(error) {
				console.log(error);
			});
		} else {
			vm.isSubmitted;
		}

	};
}
