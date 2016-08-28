import angular from 'angular';

const login = angular.module('login', []).component('loginComponent', {
    template: require('./login.html'),
    controller: function($scope, $state, Auth) {
        /* @ngInject */
        $scope.loginText = 'Sign in';

        /**
         * Login into app and redirect to result page
         */
        $scope.login = () => {
            $scope.authData = null;
            $scope.error = null;

            // change button to loading state
            $scope.loginText = 'Loading...';

            // authentication using an email / password combination
            Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(authData => {
                // the data contains all auth info
                $scope.authData = authData;
                // reset button loading state
                $scope.loginText = 'Sign in successful';
                setTimeout($state.go('edit'), 700);
            }).catch(error => {
                // catch and display error if login fails
                $scope.error = error;
                // reset button loading state
                $scope.loginText = 'Sign in';
            });
        };
    }
})

.name;

export default login;
