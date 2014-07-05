var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'app.services',
    'app.filters',
    'ui.bootstrap',
    'restangular',
    'pasvaz.bindonce',
    'angularMoment',
    'hc.marked',
    'angular-loading-bar',
    'google-maps',
    "checklist-model"
]);

app.run(function ($rootScope, $http, $location, $route) {
    $rootScope.$route = $route;
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'assets/partials/index.html',
        controller: 'HomeCtrl',
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
});

app.controller('ResumeController', ['$scope', 'Resume', function ($scope, Resume) {
    Resume.get({}, function(response) {
      console.log(response);
      $scope.data = response.files['resume.md'].content;
    });
}]);

app.controller('HeaderController', ['$scope', '$location', function ($scope, $location) { 
    $scope.notHome = function (viewLocation) { 
        return viewLocation !== $location.path();
    };
}]);



