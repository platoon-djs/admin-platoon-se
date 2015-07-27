

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