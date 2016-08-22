import angular from 'angular';

const routes = function($stateProvider, $urlRouterProvider) {
  /* @ngInject */

  $stateProvider
    .state('login', {
      url: '/login',
      component: 'loginComponent'
  });

  $stateProvider
    .state('edit', {
      url: '/edit',
      component: 'editComponent'
  });

  $stateProvider
    .state('main', {
      url: '/main',
      component: 'mainComponent'
  });

  $stateProvider
    .state('result', {
      url: '/result',
      component: 'resultComponent'
  });

  $urlRouterProvider.otherwise('main');
}

export default routes;
