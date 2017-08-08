angular.module('hotel').controller('HotelController', HotelController);

function HotelController(hotelDataFactory, $routeParams) {
	var vm = this;
	var id = $routeParams.id;
	hotelDataFactory.hotelDisplay(id).then(function(response) {
		vm.hotel = response.data;
		console.log(vm.hotel);
	});
}