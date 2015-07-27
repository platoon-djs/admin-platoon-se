/**
 * Copy platoon DJs 2014 - 2015
 */
(function(window, angular) {
"use strict";


var typeaheadJs =  ['$parse', function ($parse) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (oscope, element, attrs) {

			var engine = oscope.$eval(attrs.typeaheadEngine) || [];
			var options = oscope.$eval(attrs.typeaheadOptions) || {};
			var onSelectCallback = $parse(attrs.typeaheadOnSelect);

			var settings = angular.isArray(engine) ? engine : [engine];
			// typeahead default options
			settings.unshift(angular.extend({
				highlight: true
			}, options));
			element.typeahead.apply(element, settings);

			element.on('keydown', function(e) {
				if (e.which === 13) {
					$('.tt-suggestion:first-child', element.closest('.twitter-typeahead')).trigger('click');
				}
			});

			element.on('typeahead:select', function(obj, datum) {
				scope.$apply(function() {
					$parse(attrs.ngModel).assign(oscope, datum);
				});
				onSelectCallback(oscope, {
					$value: datum
				});
			});

			var scope = oscope.$new();
			oscope.$on('$destroy', function() {
				scope.$destroy();
			});
		}
	};
}];
var phoneNumber = function() {
    return function(input) {
        if (input == null) return;
        var p = "";
        input = input.replace(/[\s\-]+/g, '');
        for (var i = 1; i <= input.length; i++) {
            p += (i > 5 ? (i%2==1 ? " " : "") : (i%4==0 ? "-" : "")) + input[i-1];
        }
        return p;
    }
};


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


angular
	.module('platoon.cms', [])

	.controller('CMSController', ['$scope',
		function($scope) {

	}]);


angular
	.module('platoon.common', [])

	.filter('phoneNumber', phoneNumber)
	.directive('typeaheadJs', typeaheadJs);


angular
	.module('platoon.event', [])

	.controller('EventController', ['$scope', '$location', '$filter',
		function($scope, $location, $filter)
		{
			$scope.eventTypes = [{
					label: 'Private',
					type: 'private'
				},{
					label: 'Company',
					type: 'company'
				},{
					label: 'Wedding',
					type: 'wedding'
				},{
					label: 'Student',
					type: 'student'
				}
			];

			$scope.add = {};
			$scope.add.djs = {
				djs: [],
				add: function(dj) {
					$scope.$evalAsync(function() {
						$scope.add.djs.djs.push(dj);
						$scope.add.djs.current = '';
					}.bind(this));
				},
				remove: function(event) {
					var target = $(event.target).find(':selected');

					if (target.length > 0 && event.which === 8 || event.which === 46) {
						event.preventDefault();
						event.stopPropagation();

						var dj = target.html();
						for (var i = 0; i < this.djs.length; i++) {
							if (this.djs[i] == dj) {
								this.djs.splice(i, 1);
								break;
							}
						}
					}
				},
				engine: {
					name: 'djs',
					source: new Bloodhound({
						queryTokenizer: Bloodhound.tokenizers.whitespace,
						datumTokenizer: Bloodhound.tokenizers.whitespace,
						local: ['Max', 'Arvid', 'Roshan', 'Amanda', 'Robin']
					})
				}
			};
			$scope.add.type = $scope.eventTypes[0].type;
			$scope.add.phone = '';
			$scope.add.layout = 'standard';

			$scope.$watch(function() {
				return $scope.add.phone;
			}, function(val) {
                if (val != null) $scope.add.phone = $filter('phoneNumber')(val);
            });
	}]);


angular
	.module('platoon', [

		'ngResource',

		'ui.router',
		'ui.calendar',
		'ui.bootstrap',

		'platoon.common',

		'platoon.tpls',
		'platoon.admin',
		'platoon.event',
		'platoon.cms'

	]);


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
})(window, window.angular);