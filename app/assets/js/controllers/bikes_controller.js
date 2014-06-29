var app = angular.module('app');

app.controller('BikesController', ['$scope', '$routeParams', 'BikeDetail', function ($scope, $routeParams, BikeDetail) {
    $scope.data = {};
    if (!$routeParams.tag) { $routeParams.tag = 'crosscheck'; }
    console.log($routeParams.tag);
   
    BikeDetail.get({tag: $routeParams.tag}, function(response) {
      $scope.data.parts = response.details;
      $scope.data.summary = response.summary;
      $scope.data.summary['name'] = $routeParams.tag;
    });
}]);