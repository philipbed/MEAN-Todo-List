// Angular app

var todoApp = angular.module('todoApp',[]);

function mainController($scope,$http){
  $scope.formData = {};

  // AJAX call to the server to load all tasks
  $http.get('/api/todos')
    .success(function(data){
      $scope.tasks = data;
      console.log(data);
    })
    .error(function(data){
      console.error("Error "+data);
    });

  // AJAX call to the server to create a task
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

  // AJAX call to the server to delete a task
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
