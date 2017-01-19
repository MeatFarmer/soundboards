console.log('js');
var myApp = angular.module('myApp', []);

myApp.controller('registerController',['$scope', function($scope){
console.log('in registerController');

}]); //end registerController

myApp.controller('searchController',['$scope', '$http', function($scope, $http){
console.log('in searchController');

$scope.songSearch = function(){

// var youtubeAPI = angular.module('youtubeAPI', ['ngRoute']);
//   youtubeAPI.filter('youtubeEmbedUrl', function ($sce) {
//     return function(videoId) {
//       return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
//     };
//   });

  var songSearch = $scope.search;
  var self = this;
  // var key = apiConfig.key;
  var apiKey = 'AIzaSyBTvvYsO87BPcSWBvLGn-jH20pMytm9kRU';
  var arrayOfVideos = {};
  self.video = {};
  self.videoid = '';

  console.log(songSearch);
  var query = 'https://www.googleapis.com/youtube/v3/search';
            query += '?part=snippet';
            query += '&q=' + songSearch;
            query += '&maxResults=6';
            query += '&key=' + apiKey;

  // var request = encodeURI(query) + '&callback=JSON_CALLBACK';

  $http({
      method: 'GET',
      url: query,
    }).then( function( response ){
      console.log( 'response:', response );
      $scope.searchResults = response;
      console.log(response);
    });
}; // end search function

}]); // end searchController
