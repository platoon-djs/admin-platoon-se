

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