

angular
	.module('platoon.admin', [])

	.controller('AdminController', ['$scope', '$location', '$state',
		function($scope, $location, $state) {

			$scope.activeState = function(state) {
				return {
					'active': $state.current.name.split('.')[0] == state
				};
			}

			$scope.activeUrl = function(url) {
				return {
					'active': $location.url() === url
				};
			}
			
	}]);