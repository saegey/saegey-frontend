var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'app.services',
    'ui.bootstrap',
    'restangular',
    'pasvaz.bindonce',
    'angularMoment',
    'btford.markdown',
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
    when('/bikes/:tag', {
        templateUrl: 'assets/partials/bikes/index.html',
        controller: 'BikesController',
        active: 'bikes'
    }).
    when('/photos/:type', {
        templateUrl: 'assets/partials/photos/index.html',
        controller: 'PhotosController',
        active: 'photos'
    }).
    when('/activity/places', {
        templateUrl: 'assets/partials/activity/places.html',
        controller: 'ActivityPlacesController',
        active: 'activity'
    }).
    when('/activity/summary', {
        templateUrl: 'assets/partials/activity/summary.html',
        controller: 'ActivitySummaryController',
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

app.controller('HomeCtrl', function ($scope, $http) {
    $scope.users = [];
});

app.controller('ResumeController', ['$scope', 'Resume', function ($scope, Resume) {
    Resume.get({}, function(response) {
        console.log(response);
      $scope.data = response.files['resume.md'].content;
    });
}]);



