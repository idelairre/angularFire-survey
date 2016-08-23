import angular from 'angular';

const add = angular.module('edit.add', []).component('addComponent', {
  template: require('./add.html'),
  bindings: {
    questions: '='
  },
  controller: function ($scope) {
    /* @ngInject */

    $scope.questions = this.questions;

    $scope.questionData = {
        name: '',
        options: []
    };

    $scope.options = {
        number: undefined
    };

    $scope.getNumber = num => {
        return new Array(num);
    };

    $scope.remove = item => {
        $scope.questions.$remove(item);
    };

    $scope.addQuestions = () => {
        $scope.questions.$add($scope.questionData).then(() => {
            $scope.questionData = {
                name: '',
                options: []
            };
        });
    };
  }
})

.name;

export default add;
