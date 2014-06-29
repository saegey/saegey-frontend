/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', ['ngResource'])
  .factory('BikeDetail',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/bikes/:tag', {
   	  tag: '@tag'
    })
  }])
  .factory('Photos',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/instagram/:type?limit=:limit', {
   	  tag: '@type',
   	  limit: '@limit',
    })
  }])
  .factory('ActivityPlaces',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/moves/places?unique=true&page=:page&limit=:limit', {
   	  tag: '@page',
   	  limit: '@limit',
    })
  }])
  .factory('ActivitySummary',  ['$resource', function($resource) {
    return $resource('http://api.saegey.com/v1/moves/summary?unique=true&page=:page&limit=:limit', {
   	  tag: '@page',
   	  limit: '@limit',
    })
  }])
  .factory('Resume',  ['$resource', function($resource) {
  	return $resource('https://api.github.com/gists/1dc7a850a74e434507b3', {})
  }])
  .value('version', '0.1');