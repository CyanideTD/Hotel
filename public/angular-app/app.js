angular.module('hotel', ['ngRoute'])
.config(config)

function config($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/hotel-list/hotel.html',
			controller: 'HotelsController',
			controllerAs: 'vm'
		})
		.when('/hotels/:id', {
			templateUrl: 'angular-app/hotel-display/hotel.html',
			controller: 'HotelController',
			controllerAs: 'vm'
		});
}