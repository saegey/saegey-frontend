var app = angular.module('app');

app.controller('BikesController', ['$scope', '$location','$routeParams', 'BikeDetail', 'BikeRides', 'BikeIndex', function ($scope, $location, $routeParams, BikeDetail, BikeRides, BikeIndex) {
    var page = 1;
    var limit = 20;
    $scope.data = {};
    if (!$routeParams.tag) { $routeParams.tag = 'crosscheck'; }
    if (!$routeParams.group_by) { $routeParams.group_by = 'component_type'; }

    BikeIndex.get({}, function(response) {
        $scope.bikeIndex = response.bikes;
    });
   
    BikeDetail.get({tag: $routeParams.tag, group_by: $routeParams.group_by}, function(response) {
        $scope.data.components = response.components;
        $scope.showParts = true;
        $scope.data.bike_name = response.bike_name;
        $scope.data.total_price = response.total_price;
        $scope.data.weight = response.weight;
        $scope.data.photos = response.photos;
        $scope.activeTab = $routeParams.tag;
        $scope.data.groupBy = $routeParams.group_by;
    });

    BikeRides.get({tag: $routeParams.tag, page: page, limit: limit}, function(response) {
        $scope.data.rides = response.data;
        $scope.hasMore = response.has_more;
    });

    $scope.showRidesTable = function(pathurl) {
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

    $scope.groupBy = function(group) {
        BikeDetail.get({tag: $routeParams.tag, group_by: group}, function(response) {
            $scope.data.components = response.components;
        });
        $scope.data.groupBy = group;
        $location.search('group_by', group);
    }

    $scope.loadBike = function(bike_name) {
        // BikeDetail.get({tag: bike_name, group_by: $routeParams.group_by}, function(response) {
        //     $scope.data.components = response.components;
        //     $scope.showParts = true;
        //     $scope.data.bike_name = response.bike_name;
        //     $scope.data.total_price = response.total_price;
        //     $scope.data.weight = response.weight;
        //     $scope.data.photos = response.photos;
        //     $scope.activeTab = bike_name;
        //     $scope.data.groupBy = $routeParams.group_by;
        // });

        // BikeRides.get({tag: $routeParams.tag, page: page, limit: limit}, function(response) {
        //     $scope.data.rides = response.data;
        //     $scope.hasMore = response.has_more;
        // });
        // $scope.showRides = true;
        // $scope.showRides = false;
        //$location.search('tag', bike_name);
        $location.path('/bikes/' + bike_name).search('group_by', $routeParams.group_by);
    }
}]);
