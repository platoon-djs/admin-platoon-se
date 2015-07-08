

angular
	.module('platoon.admin', [])

	.controller('AdminController', ['$scope', '$location',
		function($scope, $location) {

			$scope.activeUrl = function(url) {
				return {
					'active': $location.url() === url
				};
			}
			
	}]);