var app = angular.module('app');

app.controller('ActivityController', ['$scope', '$routeParams', 'ActivityBike', function ($scope, $routeParams, ActivityBike) {
    $scope.data = {};
    $scope.selectedRides = [];

    $scope.map = {
      version: "uknown",
      showTraffic: true,
      showBicycling: false,
      showWeather: false,
      showHeat: false,
      center: {
        latitude: 47.6676291746,
        longitude: -122.3823030559
      },
      // options: {
      //   streetViewControl: false,
      //   panControl: true,
      //   maxZoom: 20,
      //   minZoom: 3
      // },
      zoom: 12,
      pan: true,
      dragging: true,
      draggable: true
    };

    ActivityBike.get({page: 1, limit: 10}, function(response) {
        $scope.data.rides = response.data;
    });

    $scope.showRides = function(rideIndex){
        // $scope.data.forEach(function())
        //$scope.map = {};
        $scope.map['polylines'] = [];
        $scope.selectedRides.forEach(function(rideId) {
            $scope.map['polylines'].push({
                path: $scope.data.rides[rideId].trackPoints,
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                id: rideId
            });
            $scope.map['center'] = {
                latitude:  $scope.data.rides[rideId].avgLat.toFixed(5),
                longitude: $scope.data.rides[rideId].avgLon.toFixed(5) 
            }
        });
        console.log($scope.map);

    //     $scope.map = {
    // events: {
    //     tilesloaded: function (map) {
    //         $scope.$apply(function () {
    //             $log.info('this is the map instance', map);             
    //         });
    //     }
    }
}]);


// app.controller('ActivitySummaryController', ['$scope', '$routeParams', 'ActivitySummary', function ($scope, $routeParams, ActivitySummary) {
//     $scope.data = {};
   
//     ActivitySummary.get({page: 1, limit: 10}, function(response) {
//         $scope.data.days = response.data;
//         $scope.convertToMiles = function(meters) {
//             return Number((meters * 0.000621371).toPrecision(2)) + " miles";
//         }
//         $scope.convertToMinutes = function(seconds) {
//             return Number((seconds / 60).toPrecision(2));
//         }
//         $scope.upcase = function capitaliseFirstLetter(string) {
//             return string.charAt(0).toUpperCase() + string.slice(1);
//         }
//     });
// }]);
