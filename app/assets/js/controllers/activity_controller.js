var app = angular.module('app');

app.controller('ActivityController', ['$scope', '$routeParams', 'ActivityBike', function ($scope, $routeParams, ActivityBike) {
    $scope.data = []
    $scope.data = { selected: null };
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

   //  $scope.myVar = 1;

   // //  $scope.$watch('myVar', function() {
   // //     console.log('hey, myVar has changed!');
   // // });

    $scope.buttonClicked = function() {
      $scope.myVar += 1; // This will trigger $watch expression to kick in
   };

    $scope.$watch('data.selected', function(newVals, old){
      // console.log(selectedRides);
      if ($scope.data.selected) {
        // ActivityBike.get({page: 1, limit: 10}, function(response) {
        // $scope.data.rides = response.data;
        // $scope.map = {
        //     center: {
        //       latitude:  response.data[selectedRides || 0].avgLat.toFixed(5),
        //       longitude: response.data[selectedRides || 0].avgLon.toFixed(5),
        //     },
        //     events: {
        //     tilesloaded: function (map) {
        //        $scope.$apply(function () {
        //           $log.info('this is the map instance', map);             
        //       });
        //     }
        //   }
        // }
        $scope.map['polylines'] = [];
        if (newVals) {
          selectedRides = newVals;
        } else {
          selectedRides = old;
        }
        console.log(selectedRides);
        if (selectedRides) {
          selectedRides.forEach(function(rideId) {
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
          });
        }
      console.log($scope.data.selected);
      }
    }, true);
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
