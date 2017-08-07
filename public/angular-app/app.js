angular.module('hotel', ['ngRoute'])
.config(config)
.controller('HotelController', HotelController);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/hotel.html',
			controller: 'HotelController',
			controllerAs: 'vm'
		});
}

function HotelController() {
	var vm = this;
	vm.title = 'MEAN Hotel';
}