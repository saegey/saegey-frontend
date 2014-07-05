var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'app.services',
    'ui.bootstrap',
    'restangular',
    'pasvaz.bindonce',
    'angularMoment',
    'hc.marked',
    'angular-loading-bar',
]);

app.filter('metersToMiles', function () {
    return function (input, round) {
        if (round) {
            return Math.round((input * 0.000621371))
                       .toString()
                       .replace(/(\d+)(\d{3})/, '$1'+','+'$2') + " mi";
        } else {
            return (input * 0.000621371).toFixed(2);
        }
        
    }
})

app.filter('metersToFeet', function () {
    return function (input) {
        return Math.round(input * 3.28084) + "'";
    }
});

app.filter('metersPerSecToMilesPerHr', function () {
    return function (input) {
        return (input * 2.23694).toFixed(2);
    }
});

app.filter('secToMin', function () {
    return function (input) {
        return Math.round((input/60).toFixed(2)) + ' min';
    }
});

app.filter('gramsToPounds', function() {
    return function (input) {
        return (input * 0.00220462).toFixed(2) + ' lbs';
    }
});

app.filter('formatCurrency', function() {
    return function (input) {
        return '$' + input.replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          .split(".")[0]
                          .replace('$', '');
    }
});


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

app.controller('HomeCtrl', function ($scope, $http) {
    $scope.users = [];
});

app.controller('ResumeController', ['$scope', 'Resume', function ($scope, Resume) {
    Resume.get({}, function(response) {
      console.log(response);
      $scope.data = response.files['resume.md'].content;
    });
}]);

app.controller('HeaderController', ['$scope', '$location', function ($scope, $location) { 
    $scope.notHome = function (viewLocation) { 
        console.log($location.path());
        return viewLocation !== $location.path();
    };
}]);



