angular.module('app.filters', [])
  .filter('metersToMiles', function () {
    return function (input, round) {
      if (round) {
        return Math.round((input * 0.000621371))
               .toString()
               .replace(/(\d+)(\d{3})/, '$1' + ',' +' $2') + " mi";
      } else {
        return (input * 0.000621371).toFixed(2);
      }
    }
  })
  .filter('metersToFeet', function () {
    return function (input) {
      return Math.round(input * 3.28084) + "'";
    };
  })
  .filter('metersPerSecToMilesPerHr', function () {
    return function (input) {
      return (input * 2.23694).toFixed(2);
    };
  })
  .filter('secToMin', function () {
    return function (input) {
      numMin = (input/60).toFixed(2);
      if (numMin > 60) {
        numHours = Math.floor(numMin / 60);
        numMin = numMin - (numHours * 60);
        return numHours + ' hr ' + Math.round(numMin) + ' min';
      } else {
        return Math.round(numMin) + ' min';
      }
    };
  })
  .filter('gramsToPounds', function() {
    return function (input) {
      return (input * 0.00220462).toFixed(2) + ' lbs';
    };
  })
  .filter('formatCurrency', function() {
    return function (input) {
      return numeral(input).format('$0,0.00');
    };
  })
  .filter('movesToMin', function() {
    return function (input) {
      return (input / 60).toFixed(2);
    };
  });
