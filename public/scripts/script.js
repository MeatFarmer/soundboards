console.log('js');

var myApp = angular.module('myApp', []);

myApp.controller('registerController',['$scope', function($scope){
console.log('in registerController');

}]); //end registerController

myApp.filter('youtubeEmbedUrl', function ($sce) {
    return function(videoId) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
    };
  });

myApp.controller('searchController',['$scope', '$http', function($scope, $http){
console.log('in searchController');

$scope.songSearch = function(){

  var songSearch = $scope.search;
  var self = this;
  var apiKey = 'AIzaSyBTvvYsO87BPcSWBvLGn-jH20pMytm9kRU';
  self.video = {};
  self.videoid = '';

  self.songSearch = function(){

  myApp.filter('youtubeEmbedUrl', function ($sce) {
      return function(videoId) {
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
      };
    });

  console.log(songSearch);
  var query = 'https://www.googleapis.com/youtube/v3/search';
            query += '?part=snippet';
            query += '&q=' + songSearch + 'guitar lesson';
            query += '&maxResults=6';
            query += '&key=' + apiKey;

  // var request = encodeURI(query) + '&callback=JSON_CALLBACK';

  $http({
      method: 'GET',
      url: query,
    }).then( function( response ){
      console.log( 'response:', response );
      $scope.searchResults = response.data.items.filter(function(item){
        if (item.id.kind === "youtube#video"){
          return true;
        }
        else {
          return false;
        }
      // }).map(function(item){
      //   item.id.videoId = 'www.youtube.com/watch?v=' + item.id.videoId;
      //   return item;
      // });
      console.log($scope.searchResults);

    });
  });
}; // end search function
};
}]); // end searchController
