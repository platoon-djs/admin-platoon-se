/**
 * Copy platoon DJs 2014 - 2015
 */
(function(window, angular) {
"use strict";


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


angular
	.module('platoon.cms', [])

	.controller('CMSController', ['$scope',
		function($scope) {

	}]);


angular
	.module('platoon.event', [])

	.controller('EventController', ['$scope', '$location',
		function($scope, $location) {

			$scope.eventSources = [];

	}]);


angular
	.module('platoon', [

		'ngResource',
		'ngRoute',

		'ui.calendar',
		'ui.bootstrap',

		'platoon.tpls',
		'platoon.admin',
		'platoon.event',
		'platoon.cms'

	]);


angular
	.module('platoon')

	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$locationProvider.html5Mode(true);
		    $locationProvider.hashPrefix('!');

			$routeProvider
				.when('/cms', {
					templateUrl: 'tpl/cms/index.html',
					controller: 'CMSController'
				})

				.when('/event', {
					templateUrl: 'tpl/event/index.html',
					controller: 'EventController'
				})

				.when('/config', {
					templateUrl: 'tpl/config/index.html',
					controller: 'CMSController'
				})

				.when('/dashboard', {
					templateUrl: 'tpl/dashboard/index.html',
					controller: 'CMSController'
				})

				.otherwise({
					redirectTo: '/dashboard'
				})

	}])
})(window, window.angular);