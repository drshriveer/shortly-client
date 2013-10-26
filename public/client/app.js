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
  .controller('CreateCtrl',function($scope, $http){

    $scope.post = function(){
      // TODO: start spinner
      $http.post('/links', {url: $scope.url})
        .success(function(data, status, headers, config){
          // TODO: stop spinner!
          $scope.links = $scope.links || [];
          $scope.links.push(data);
        })
        .error(function(data, status){
          // TODO: stop spinner!
          console.log('Post did not succeed.');
        });
    }
  })
  .controller("LinksCtrl", function($scope, $http){
    $http.get('/links')
      .success(function(data, status, headers, config){
        $scope.links = data;
      })
      .error(function(data, status){
        console.log('Get did not succeed.');
      });
});