angular.module('hotel').controller('RegisterController', RegisterController);

function RegisterController($http) {
	var vm = this;

	vm.register = function() {
		var user = {
			name: vm.name,
			username: vm.username,
			password: vm.password
		};

		if (vm.password != vm.passwordRepeat) {
			vm.error="Please make sure the password match";
		} else {
			$http.post('/api/users/register', user).then(function(response) {
				console.log(response);
				vm.error="";
				vm.message="Successful registration, please login.";
			}).catch(function(error) {
				console.log(error);
			});
		}
	}
};