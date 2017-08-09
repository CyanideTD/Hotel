angular.module('hotel', ['ngRoute', 'angular-jwt'])
.config(config)
.run(run);

function config($httpProvider, $routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$httpProvider.interceptors.push('AuthInterceptor');

	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/main/main.html',
			access: {
				restricted: false
			}
		})
		.when('/hotels', {
			templateUrl: 'angular-app/hotel-list/hotel.html',
			controller: 'HotelsController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/hotels/:id', {
			templateUrl: 'angular-app/hotel-display/hotel.html',
			controller: 'HotelController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/register', {
			templateUrl: 'angular-app/hotel-register/register.html',
			controller: 'RegisterController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/profile', {
			tmplateUrl: "angular-app/profile/profile.html",
			access: {
				restricted: true
			}
		})
		.otherwise({
			redirect: '/'
		});
};

function run($rootScope, $location, $window, AuthFactory) {
	$rootScope.$on('$rootChangeStart', function(event, nextRoute, currentRoute) {
		if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
			event.preventDefault();
			$location.path('/');
		}
	})
};