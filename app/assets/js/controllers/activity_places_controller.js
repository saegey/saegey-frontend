var app = angular.module('app');

app.controller('ActivityPlacesController', function ($scope, $routeParams, $modal, ActivityPlaces) {
    $scope.data = {};
   
    ActivityPlaces.get({page: 1, limit: 10}, function(response) {
    	console.log(response);
      $scope.data.days = response.data;
    });

    $scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (size) {

		var modalInstance = $modal.open({
		  templateUrl: 'myModalContent.html',
		  controller: ModalInstanceCtrl,
		  size: size,
		  resolve: {
		    items: function () {
		      return $scope.items;
		    }
		  }

		modalInstance.result.then(function (selectedItem) {
			  $scope.selected = selectedItem;
			}, function () {
			  $log.info('Modal dismissed at: ' + new Date());
			});
		};
	};
};


app.controller('ActivitySummaryController', ['$scope', '$routeParams', 'ActivitySummary', function ($scope, $routeParams, ActivitySummary) {
    $scope.data = {};
   
    ActivitySummary.get({page: 1, limit: 10}, function(response) {
    	$scope.data.days = response.data;
    	$scope.convertToMiles = function(meters) {
    		return Number((meters * 0.000621371).toPrecision(2)) + " miles";
    	},
    	$scope.convertToMinutes = function(seconds) {
    		return Number((seconds / 60).toPrecision(2));
    	},
    	$scope.upcase = function capitaliseFirstLetter(string) {
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}
    });
}]);