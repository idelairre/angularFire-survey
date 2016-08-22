import angular from 'angular';

const nav = angular.module('nav', ['firebase']).component('navComponent', {
  template: require('./nav.html'),
  controller: function($scope, Auth) {
    $scope.authData = Auth.$getAuth();

    Auth.$onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        $scope.authData = firebaseUser.uid;
      } else {
        $scope.authData = null;
      }
    });

    $scope.logout = () => {
      Auth.$signOut();
    }
  }
})

.name;

export default nav;
