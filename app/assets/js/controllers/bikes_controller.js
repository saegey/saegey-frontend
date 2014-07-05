var app = angular.module('app');

app.controller('BikesController', ['$scope', '$location','$routeParams', 'BikeDetail', 'BikeRides', function ($scope, $location, $routeParams, BikeDetail, BikeRides) {
    var page = 1;
    var limit = 20;
    $scope.data = {};
    if (!$routeParams.tag) { $routeParams.tag = 'crosscheck'; }
   
    BikeDetail.get({tag: $routeParams.tag}, function(response) {
        $scope.data.parts = response.details;
        $scope.showParts = true;
        $scope.data.summary = response.summary;
        $scope.data.photos = response.photos;
        $scope.activeTab = $routeParams.tag;
    });

    BikeRides.get({tag: $routeParams.tag, page: page, limit: limit}, function(response) {
        $scope.data.rides = response.data;
        $scope.hasMore = response.has_more;
    });

    $scope.showRidesTable = function(pathurl){
        $scope.showParts = false;
        $scope.showRides = true;
        if (!$scope.data.rides) {
            BikeRides.get({tag: $routeParams.tag, page: page, limit: limit}, function(response) {
                $scope.data.rides = response.data;
            });
        }
    }

    $scope.loadMoreRides = function() {
        BikeRides.get({tag: $routeParams.tag, limit: limit, page: page + 1}, function(response) {
            page++;
            response.data.forEach(function (ride) {
                $scope.data.rides.push(ride);
            });
        });
    }

    $scope.showPartsTable = function() {
        $scope.showParts = true;
        $scope.showRides = false;
    }
}]);
