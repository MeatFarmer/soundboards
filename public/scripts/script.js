console.log('js');
var myApp = angular.module('myApp', []);

myApp.controller('indexController',['$scope', function($scope){
console.log('in indexController');
}]);

myApp.controller('registerController', ['$scope', '$http', function($scope, $http){
console.log('in registerController');
}]);
