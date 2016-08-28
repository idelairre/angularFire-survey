import angular from 'angular';

const questions = angular.module('edit.questions', []).component('questionsComponent', {
  template: require('./questions.html'),
  bindings: {
    labels: '<',
    questions: '=',
    ref: '<'
  },
  controller: function ($scope) {
    /* @ngInject */

    $scope.labels = this.labels;

    $scope.questions = this.questions;

    $scope.addOption = question => {
        $scope.questions.map(q => {
            if (q.name === question) {
                if (!q.options) {
                    q.options = [];
                    $scope.questions.$save(q);
                } else if (!Array.isArray(q.options)) {
                  q.options = Array.from(q.options);
                }
                q.options.push({ name: 'click to edit question' });
                $scope.questions.$save(q);
            }
        });
    }

    $scope.saveOption = (question, index, data) => {
      $scope.questions.$save(question);
    }

    $scope.items = [
        'text input',
        'text box',
        'checkbox',
        'radio',
        'rating/scale'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggleDropdown = $event => {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
  }
})

.name;

export default questions;
