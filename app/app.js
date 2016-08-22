import angular from 'angular';
import btnRadio from './directives/btnRadio';
import components from './components';
import routes from './routes/routes';
import services from './services/services';
import uiRouter from 'angular-ui-router';
import 'firebase';
import 'angularfire';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-xeditable';
import 'angular-sanitize';

angular.module('pollingApp', ['xeditable', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', uiRouter, components, services])

.config(routes)

.run(['$rootScope', '$location', 'Auth',
  function($rootScope, $location, Auth) {
    // any time auth status updates, add auth data to rootScope
    Auth.$onAuthStateChanged(function(authData) {
      $rootScope.authData = authData;
    });

    $rootScope.logout = function() {
      Auth.$signOut();
      $location.path('/survey');
    };

    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === 'AUTH_REQUIRED') {
          $location.path('/survey');
      }
    });
  }
])

.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
