//* Services */

angular.module('app.services', ['ngResource'])
  .factory('BikeDetail', ['$resource', function($resource) {
    return $resource(
      'https://saegey-bike-data-service.herokuapp.com/v1/bikes/:tag?group_by=:group_by',
      {group_by: '@group_by'},
      {
        list : {
          method : 'GET',
          cache : true
        }
      }
    );
  }])
  .factory('BikeIndex', ['$resource',
    function($resource) {
      return $resource('https://saegey-bike-data-service.herokuapp.com/v1/bikes', {}, {
        list : {
          method : 'GET',
          cache : true
        }
      });
    }
  ])
  .factory('BikeRides', ['$resource',
    function($resource) {
      return $resource('https://saegey-bike-data-service.herokuapp.com/v1/bikes/:tag/rides?limit=:limit&page=:page', {
        tag: '@tag',
        page: '@page',
        limit: '@limit',
      })
    }
  ])
  .factory('Photos', ['$resource',
    function($resource) {
      return $resource('https://saegey-bike-data-service.herokuapp.com/v1/instagram/:type?page=:page&limit=:limit', {
        type: '@type',
        page: '@page',
        limit: '@limit',
      })
    }
  ])
  .factory('ActivitySummary', ['$resource',
    function($resource) {
      return $resource('https://saegey-bike-data-service.herokuapp.com/v1/moves/summary?unique=true&page=:page&limit=:limit', {
        page: '@page',
        limit: '@limit',
      })
    }
  ])
  .factory('StravaUpload', ['$resource',
    function($resource) {
      return $resource('http://localhost:3000/v1/strava/upload', {
        segments: '@segments'
      })
    }
  ])
  .factory('Resume', ['$resource',
    function($resource) {
      return $resource('https://api.github.com/gists/1dc7a850a74e434507b3', {})
    }
  ])
  .factory('User', ['$resource',
    function($resource) {
      return $resource('http://localhost:3000/auth/users/:id/', {}, {
        'update': {
          method: 'PUT'
        }
      });
    }
  ])
  .factory('Session', ['$resource',
    function($resource) {
      return $resource('http://localhost:3000/auth/session/');
    }
  ]);
