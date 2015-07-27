

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