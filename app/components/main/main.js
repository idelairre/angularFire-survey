import angular from 'angular';

const main = angular.module('main', ['ui.bootstrap', 'nav', 'survey']).component('mainComponent', {
    template: require('./main.html'),
    controller: function($scope, $uibModal) {
        /* @ngInject */

        // hide success information/alert
        $scope.successInfo = false;

        // open survey modal dialog
        $scope.takeSurvey = () => {
            const modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'survey',
                ariaDescribedBy: 'modal-body',
                template: require('../survey/survey.html'),
                controller: 'surveyController',
                size: 'lg'
            });
            modalInstance.result.then(function() {}, function() {});
        };
    }
})

.name;

export default main;
