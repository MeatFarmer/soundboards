console.log('js');

var myApp = angular.module('myApp', []);

myApp.filter('youtubeEmbedUrl', function ($sce) {
    return function(videoId) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
    };
  });

myApp.controller('indexController',['$scope', '$http', function($scope, $http){
console.log('in indexController');



$scope.songSearch = function(){
  var songSearch = $scope.search;
  var self = this;
  var apiKey = 'AIzaSyBTvvYsO87BPcSWBvLGn-jH20pMytm9kRU';
  self.video = {};
  self.videoid = '';

  self.songSearch = function(){

  console.log('in song search', songSearch);
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
      console.log('yes', response);
      console.log( 'response:', response.data.items );
      $scope.searchResults = response.data.items;
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
$scope.saveSrc = function(indexIn) {
  var vidId = { id: $scope.searchResults[ indexIn ].id.videoId };
  console.log('This is the VideoID', vidId);

$http({
  method: "POST",
  url: '/',
  data: vidId
}).then(function (response){
  console.log('Post response', response);
});
};



}]); // end searchController
