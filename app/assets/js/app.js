var app = angular.module('app', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'app.services',
  'app.filters',
  'angularMoment',
  'hc.marked',
  'angular-loading-bar',
  'google-maps',
  'checklist-model'
  // 'restangular',
  // 'pasvaz.bindonce',
]);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'assets/partials/index.html',
    active: 'home'
  }).
  when('/bikes/:tag/rides', {
    templateUrl: 'assets/partials/bikes/rides.html',
    controller: 'BikeController',
    active: 'bikes'
  }).
  when('/bikes/:tag', {
    templateUrl: 'assets/partials/bikes/index.html',
    controller: 'BikesController',
    active: 'bikes'
  }).
  when('/bikes', {
    templateUrl: 'assets/partials/bikes/index.html',
    controller: 'BikesController',
    active: 'bikes'
  }).
  when('/photos/:type', {
    templateUrl: 'assets/partials/photos/index.html',
    controller: 'PhotosController',
    active: 'photos'
  }).
  when('/photos', {
    templateUrl: 'assets/partials/photos/index.html',
    controller: 'PhotosController',
    active: 'photos'
  }).
  when('/code', {
    templateUrl: 'assets/partials/code/index.html',
    controller: 'CodeController',
    active: 'code'
  }).
  when('/login', {
    templateUrl: 'assets/partials/login.html',
    controller: 'LoginCtrl'
  }).
  when('/signup', {
    templateUrl: 'assets/partials/signup.html',
    controller: 'SignupCtrl'
  }).
  when('/activity', {
    templateUrl: 'assets/partials/activity/index.html',
    controller: 'ActivityController',
    active: 'activity'
  }).
  when('/activity/summary', {
    templateUrl: 'assets/partials/activity/index.html',
    controller: 'ActivityController',
    active: 'activity'
  }).
  when('/resume', {
    templateUrl: 'assets/partials/resume/index.html',
    controller: 'ResumeController',
    active: 'resume'
  }).
  when('/about', {
    templateUrl: 'assets/partials/about/index.html',
    active: 'about'
  }).
  otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $http, $location, $route, Auth) {
  $rootScope.$route = $route;

  //watching the value of the currentUser variable.
  $rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization then try to update it
    // will trigger 401s if user does not have a valid session
    if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1)) {
      Auth.currentUser();
    }
  });

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    return false;
  });
});

app.controller('ResumeController', ['$scope', 'Resume',
  function($scope, Resume) {
    Resume.get({}, function(response) {
      console.log(response);
      $scope.data = response.files['resume.md'].content;
    });
  }
]);

app.controller('HeaderController', ['$scope', '$location',
  function($scope, $location) {
    $scope.notHome = function(viewLocation) {
      return viewLocation !== $location.path();
    };
  }
]);
