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
    },
    createLink: function(url){
      var deferred = $q.defer();
      $http({
        method: "POST",
        url: '/links',
        data: {url: url}
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }
  };
  return service; 
});

    //LINK CONTROLLERS:
app.controller("LinksCtrl", function($scope, $http, linkService){
  linkService.getLinks().then(function(data){
    $scope.links = data;
  });
});

    //LINK CONTROLLERS:
app.controller('CreateCtrl',function($scope, $http, linkService){
  //should check if input has valid url
  $scope.post = function(){
    if($scope.urlForm.urlBox.$valid){
      linkService.createLink($scope.url).then(function(data){
        $scope.links = $scope.links || [];
        $scope.links.push(data);
        $scope.url = "";  //chear the data
      });
    }
  }
});