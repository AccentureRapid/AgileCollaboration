// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','restangular','starter.services','starter.controllers','starter.constants.module'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider','$urlRouterProvider','environmentSettingProvider','RestangularProvider',
function($stateProvider, $urlRouterProvider,environmentSettingProvider,RestangularProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.tickets', {
      url: '/tickets',
      views: {
        'menuContent': {
          templateUrl: 'templates/tickets.html',
          controller: 'TicketsCtrl'
        }
      }
    })

  .state('app.projects', {
      url: '/projects',
      views: {
        'menuContent': {
          templateUrl: 'templates/projects.html',
          controller: 'ProjectsCtrl'
        }
      }
    })

  .state('app.ticketList', {
    url: '/tickets/:ticketId',
    views: {
      'menuContent': {
        templateUrl: 'templates/ticketlist.html',
        controller: 'TicketCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tickets');


  var currentEnvironment = 'LOCAL', //MOCK, LOCAL, DEV, STAGE, PROD
      environment = '';

  environmentSettingProvider.setEnvironment(currentEnvironment);
  environment = environmentSettingProvider.$get();


  // Restangular configuration
  var baseUrl = environment.BASE_URL;
  RestangularProvider.setBaseUrl(baseUrl);

  RestangularProvider.setDefaultHttpFields({ cache: false });
  RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json'
  });
  RestangularProvider.setMethodOverriders(["put", "patch"]);

}]);
