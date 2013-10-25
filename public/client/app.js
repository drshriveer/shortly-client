var app = angular.module('Shortly',[])
  .controller("ShortlyController", function($scope, $http){
    $http.get('/links')
      .success(function(data, status, headers, config){
        $scope.links = data;
      })
      .error(function(data, status){
        console.log('son of a bitch !!!');
      });
});