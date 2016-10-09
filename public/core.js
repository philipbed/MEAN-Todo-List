// Angular app

var todoApp = angular.module('todoApp',[]);

function mainController($scope,$http){
  $scope.formData = {};

  $http.get('/api/todos')
    .success(function(data){
      $scope.tasks = data;
      console.log(data);
    })
    .error(function(data){
      console.error("Error "+data);
    });

  $scope.createTodo = function(){
    $http.post('/api/todos',$scope.formData)
      .success(function(data){
        $scope.formData = {};
        $scope.tasks = data;
        console.log(data);
      })
      .error(function(data){
        console.error("Error "+data);
      });
  };

  $scope.deleteTodo = function(id){
    $http.delete('api/todos/'+id)
      .success(function(data){
        $scope.tasks = data;
        console.log(data);
      })
      .error(function(data){
        console.error("Error "+data);
      });
  };
}
