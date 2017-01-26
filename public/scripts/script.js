console.log('js');

var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'profileController'
  })
  .otherwise({
    redirectTo: '/index'
  });
}]); //end routeProvider

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

myApp.controller('profileController',['$scope', '$http', function($scope, $http){
console.log('in indexController');

$scope.display = function(){
  console.log('GET');
    $http({
      method:'GET',
      url: '/routers/getVid'
    }).then(function(response){
      console.log('GET Response', response.data);
      $scope.favorites = response.data;
    });
}; //end GET

$scope.deleteSrc = function(indexIn) {

$http({
  method: "DELETE",
  url: '/routers/' + $scope.favorites[ indexIn ]._id,
}).then(function (response){
  console.log('Post response', response);
  $scope.display();
});
};

}]); //end profileController
