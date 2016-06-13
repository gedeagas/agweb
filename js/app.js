

var app = angular.module("AgastyaBlog", ['ui.bootstrap']);
var app = angular.module("AgastyaBlog", ['ngSanitize']);


app.controller("PostsCtrl", function($scope, $http) {
  $http.get('https://www.agastyadarma.com/api/blog/wp-json/wp/v2/posts/?per_page=1').
    success(function(data, status, headers, config) {
      $scope.posts = data;
      
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});
