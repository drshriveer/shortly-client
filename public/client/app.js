var app = angular.module('Shortly',[])
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        controller: "LinksCtrl",
        templateUrl: "templates/links.html"
      })
      .when('/create',{
        controller: "CreateCtrl",
        templateUrl: "templates/create.html"
      })
      .otherwise({
        redirectTo: '/'
      })
  });


// --------------------------------
//  Getting and Creating Links
// --------------------------------

    //LINK SERVICE:
app.factory('linkService', function($http, $q){
    var service = {
      getLinks: function(){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: '/links'
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(error){
          deferred.reject(error)
        })
        return deferred.promise;
      }
    };
    return service; 
  })

    //LINK CONTROLLERS:
app.controller("LinksCtrl", function($scope, linkService , $http){
    linkService.getLinks().then(function(data){
      $scope.links = data;
    });
});

    //LINK CONTROLLERS:
app.controller('CreateCtrl',function($scope, $http){

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
  });