angular.module('hotel').controller('HotelsController', HotelsController)

function HotelsController(hotelDataFactory) {
	var vm = this;
	vm.title = 'MEAN Hotel';
	hotelDataFactory.hotelList().then(function(response) {
		vm.hotels = response.data;
	});
}