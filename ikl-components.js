// Angular module
(function(ang) {

	var module = ang.module('ikl-components', []);

	module.directive('iklSuperCombo', function () {
		return {
			restrict: 'EA',
			templateUrl: '../templates/ikl-super-combo.html',
			scope: {
				options: '='
			},
			controller: function ($scope) {
				$scope.models = {}
				$scope.methods = {}

				// Methods

				// Init
					$scope.models.isOpen = false;
					$scope.models.simpleSelect = (typeof ($scope.options || [])[0]) == 'string';
			}
		}
	})

	module.directive('iklSuperComboGroup', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				collection: '='
			},
			template: '<ul><ikl-super-combo-item ng-repeat="item in collection" item="item"></ikl-super-combo-item></ul>'
	  }
	})

	module.directive('iklSuperComboItem', function ($compile) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				item: '='
			},
			template: '<li><span ng-click="clickItem(item)">{{ item.name }}</span><button ng-if="item.children.length" ng-click="toggleShow(item)">{{ !item.show ? \'v\':\'^\' }}</button></li>',
			link: function (scope, element, attrs) {
				if (angular.isArray(scope.item.children)) {
					element.append('<ikl-super-combo-group ng-if="item.show" collection="item.children"></ikl-super-combo-group>');
					$compile(element.contents())(scope)
				}
				scope.clickItem = function (item) {
					if (!window.iklSCIClicked) {
						window.iklSCIClicked = true;
						console.log(item);
						setTimeout(function () { window.iklSCIClicked = false; }, 10);
					}
				}
				scope.toggleShow = function (item) {
					if (!window.iklSCIShow) {
						window.iklSCIShow = true;
						item.show = !!!item.show;
						setTimeout(function () { window.iklSCIShow = false; }, 10);
					}
				}
			}
	  }
	})

})(angular)