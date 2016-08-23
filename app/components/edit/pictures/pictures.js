import angular from 'angular';

const pictures = angular.module('edit.pictures', []).component('picturesComponent', {
  template: require('./pictures.html'),
  bindings: {
    labels: '='
  },
  controller: function ($scope) {
    /* @ngInject */
    $scope.labels = this.labels;

    $scope.editLabel = label => {
        $scope.labels.$save(label);
    };
  }
})

.name;

export default pictures;
