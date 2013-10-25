var app = angular.module('Shortly',[])
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        controller: "LinksCtrl",
        // template: "<h1> I'm a template! </h1>"
        templateUrl: "templates/links.html"
      })
      .when('/create',{
        controller: "CreateCtrl",
        templateUrl: "templates/create.html"
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  //controllers: 
  .controller('createCtrl',function($scope, $http){
    //---
  })
  .controller("LinksCtrl", function($scope, $http){
    $http.get('/links')
      .success(function(data, status, headers, config){
        $scope.links = data;
      })
      .error(function(data, status){
        console.log('son of a bitch !!!');
      });
});