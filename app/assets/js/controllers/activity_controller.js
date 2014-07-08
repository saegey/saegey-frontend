var app = angular.module('app');

app.controller('ActivityController', ['$scope', '$routeParams', 'ActivityBike', 'StravaUpload', function ($scope, $routeParams, ActivityBike, StravaUpload) {
    $scope.data = []
    $scope.data = { selected: null };
    $scope.uploadIsDisabled = 'disabled';
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

    ActivityBike.get({page: 1, limit: 8}, function(response) {
      $scope.data.rides = response.data;
    });

    $scope.upload = function() {
      var rideIds = [];
      var flatIds = [];

      $scope.data.selected.forEach(function (seg) {
        rideIds.push({
          id: $scope.data.rides[seg]._id,
          parentId: $scope.data.rides[seg].parentId
        });
        flatIds.push($scope.data.rides[seg]._id);
      });

      StravaUpload.save({}, rideIds, function(response) {
        response.data.forEach(function(uploadedRide) {
          $scope.data.rides.forEach(function(existingRide, index) {
            if (existingRide._id === uploadedRide._id) {
              $scope.data.rides[index].stravaId = uploadedRide.stravaId;
            }
          });
        });
        $scope.uploadIsDisabled = "disabled";
        $scope.data.selected = [];
      }, function(err) { console.log(err); } );
   };

    $scope.$watch('data.selected', function(newVals, old) {
      console.log($scope.data.selected);
      if ($scope.data.selected && $scope.data.selected.length > 0) {

        $scope.map['polylines'] = [];
        if (newVals) {
          selectedRides = newVals;
        } else {
          selectedRides = old;
        }
        console.log(selectedRides);
        if (selectedRides) {
          $scope.uploadIsDisabled = "";
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
      } else {
          $scope.uploadIsDisabled = "disabled";
      }
    }, true);
}]);

