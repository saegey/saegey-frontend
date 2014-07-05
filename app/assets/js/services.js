/* Services */

angular.module('app.services', ['ngResource'])
  .factory('BikeDetail',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/bikes/:tag?group_by=partcategory', {
   	  tag: '@tag'
    })
  }])
  .factory('BikeRides',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/bikes/:tag/rides?limit=:limit&page=:page', {
      tag: '@tag',
      page: '@page',
      limit: '@limit',
    })
  }])
  .factory('Photos',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/instagram/:type?page=:page&limit=:limit', {
   	  type: '@type',
      page: '@page',
   	  limit: '@limit',
    })
  }])
  .factory('ActivityBike',  ['$resource', function($resource) {
    return $resource('http://localhost:3000/v1/activity/bike?page=:page&limit=:limit', {
   	  page: '@page',
   	  limit: '@limit',
    })
  }])
  .factory('ActivitySummary',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/moves/summary?unique=true&page=:page&limit=:limit', {
   	  page: '@page',
   	  limit: '@limit',
    })
  }])
  .factory('Resume',  ['$resource', function($resource) {
  	return $resource('https://api.github.com/gists/1dc7a850a74e434507b3', {})
  }]);