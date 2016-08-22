import angular from 'angular';

const btnRadio = angular.module('pollingApp.directives', ['ngRoute'])

/**
 * btnRadio directive
 * angular-ui/bootstrap/src/buttons
 * @copyright Angular-UI team 2014
 */

.directive('btnRadio', [function() {
    var activeClass = 'active';
    var toggleEvent = 'click';

    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {

            //model -> UI
            ngModelCtrl.$render = function() {
                element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
            };

            //ui->model
            element.bind(toggleEvent, function() {
                if (!element.hasClass(activeClass)) {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                        ngModelCtrl.$render();
                    });
                }
            });
        }
    };
}]);

export default btnRadio;
