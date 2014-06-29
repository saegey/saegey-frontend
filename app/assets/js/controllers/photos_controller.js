var app = angular.module('app');

app.controller('PhotosController', ['$scope', '$routeParams', 'Photos', function ($scope, $routeParams, Photos) {
    $scope.data = {};
    console.log($routeParams.tag);
   
    Photos.get({type: $routeParams.type, limit: 10}, function(response) {
      console.log(response);
      $scope.data.photos = response.data;
    });
}]);
