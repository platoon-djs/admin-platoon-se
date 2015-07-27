

angular
	.module('platoon')

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
		function($stateProvider, $urlRouterProvider, $locationProvider)
		{
			$locationProvider.html5Mode(true);
		    $locationProvider.hashPrefix('!');

			$urlRouterProvider.otherwise("/");

			$stateProvider

				.state('dashboard', {
					url: '/',
					templateUrl: 'dashboard.html',
					controller: 'CMSController'
				})

				.state('music', {
					url: '/music',
					templateUrl: 'music.html',
					controller: 'CMSController'
				})

				.state('cms', {
					url: '/cms',
					templateUrl: 'cms.html',
					controller: 'CMSController'
				})

				.state('event', {
					url: '/event',
					abstract: true,
					templateUrl: 'event.html',
					controller: 'EventController'
				})

				.state('event.calendar', {
					url: '',
					templateUrl: 'event.calendar.html'
				})

				.state('event.list', {
					url: '/list',
					templateUrl: 'event.list.html'
				})

				.state('event.ledger', {
					url: '/ledger',
					templateUrl: 'event.ledger.html'
				})

				.state('event.history', {
					url: '/history',
					templateUrl: 'event.history.html'
				})

				.state('event.create', {
					url: '/create',
					templateUrl: 'event.create.html'
				})

				.state('config', {
					url: '/config',
					templateUrl: 'config.html',
					controller: 'CMSController'
				});

	}])