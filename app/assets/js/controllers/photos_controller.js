var app = angular.module('app');

app.controller('PhotosController', ['$scope', '$routeParams', 'Photos', function ($scope, $routeParams, Photos) {
  $scope.data = {};
  var page = 1;
  var type = $routeParams.type || 'user';
  var limit = 12;
  $scope.activeTab = type;

  Photos.get({type: type, limit: limit, page: page}, function (response) {
    $scope.data.photos = response.data;
    $scope.page = $routeParams.page;

    $scope.data.loadMore = function () {
      Photos.get({type: type, limit: limit, page: page + 1}, function (response) {
        page++;
        response.data.forEach(function (photo) {
          $scope.data.photos.push(photo);
        });
      });
    };
  });
}]);

