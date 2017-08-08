angular.module('hotel').controller('HotelController', HotelController);

function HotelController($route, hotelDataFactory, $routeParams) {
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

	vm.addReview = function() {
		var postData = {
			name : vm.name,
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
