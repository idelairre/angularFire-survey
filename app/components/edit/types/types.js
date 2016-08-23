import angular from 'angular';

const types = angular.module('edit.types', []).component('typesComponent', {
  template: require('./types.html'),
  bindings: {
    labels: '='
  },
  controller: function ($scope) {
    /* @ngInject */
    $scope.labels = this.labels;

    $scope.editLabel = label => {
        $scope.labels.$save(label);
    };

    $scope.addLabel = label => {
        $scope.labels.$add(label);
    };

    $scope.removeLabel = label => {
        $scope.labels.$remove(label);
    }
  }
})

.name;

export default types;
