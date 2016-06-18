/* ARCHIPEL OPEN SOURCE PROGRAM 

PROJECT PRITHA 

VERSION 1.2 

LEAD DESIGNER :
AGASTYA DARMA 

SUPPORTED BY :
AngularJS by Google 
JQuery 
Wordpress
PHP 


*/


/* ARCHIPEL OPEN SOURCE PROGRAM 

FITER MODULE 
FILTER CONFIG FOR LIMITING CHARACTHER

*/

var app = angular.module('AgastyaBlog', ['ngSanitize', 'ui.bootstrap', 'ngRoute', 'angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);


app.filter('strLimit', ['$filter', function($filter) {
   return function(input, limit) {
      if (! input) return;
      if (input.length <= limit) {
          return input;
      }

      return $filter('limitTo')(input, limit) + '...';
   };
}]);

app.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'theme/index.html',
                controller  : 'PostsCtrl'
            })

            // route for the about page
            .when('/post/:slug', {
                templateUrl : 'theme/viewpost.html',
                controller  : 'ViewPostCtrl'
            })

            // route for the about page
            .when('/kucing', {
                templateUrl : 'theme/kucing.html',
                controller  : 'ViewPostKucingCtrl'
            }).otherwise({redirectTo:'/'});
         $locationProvider.html5Mode(true);

            
});




app.controller("PostsCtrl", function($scope, $http) {
	document.querySelector('title').innerHTML ='Welcome To My Blog | Agastya Darma Blog';
  	$http.get('https://agastyadarma.com/api/blog/wp-json/wp/v2/posts/?per_page=1').
    success(function(data, status, headers, config) {
      $scope.posts = data;

      $scope.linkartikel = 'post/' + data[0].slug;
      
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});

app.controller('ViewPostCtrl', function($scope, $http, $routeParams, $rootScope, $window){


  $http({
          method: 'GET',
          url: 'https://www.agastyadarma.com/api/blog/wp-json/wp/v2/posts/?slug=' + $routeParams.slug
        }).then(function successCallback(response) {
            

          $scope.apakahnull = response.headers('X-WP-Total');
          if ($scope.apakahnull == 0) {
            $window.location.href = '/index.html';
          } else {

            $scope.posts = response.data;
            $scope.titlenyabos = response.data[0].title.rendered;
            document.querySelector('title').innerHTML = $scope.titlenyabos + ' | Agastya Darma Blog';

          }
          

          
        }, function errorCallback(response) {
          $window.location.href = '/index.html';
        });

 
  

  
});


app.controller('ListPostCtrl', function($scope, $http, $routeParams, $rootScope, $window){


  $http({
          method: 'GET',
          url: 'https://agastyadarma.com/api/blog/wp-json/wp/v2/posts/?per_page=4'
        }).then(function successCallback(response) {
            
          // Mengecek apakah null / tidak ada response 
          // Check if the post is exist or not
          $scope.apakahnull = response.headers('X-WP-Total');

          // If no post entry redirect to 404 page
          if ($scope.apakahnull == 0) {
            $window.location.href = '/index.html';
          } else {

            $scope.listposts = response.data;
            $scope.titlenyabos = response.data[0].title.rendered;            
            $scope.linkartikel = 'post/' + response.data[0].slug;

          }
          

          
        }, function errorCallback(response) {
          $window.location.href = '/index.html';
        });

 
  

  
});