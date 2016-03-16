angular.module('todoApp', [

]); //this is the setter syntax, you are creating an application using this one

angular.module('todoApp') //this is the getter syntax, we can use this so we don't have to make a variable to store our angular application; YAYYY no globals
      .controller('TodoController', TodoController);

TodoController.$inject = ['$scope', '$http', 'TodoService'];

function TodoController($scope, $http, TodoService){
  getTodos();
  $scope.isEditing = false;

  //Create a new todo
  $scope.saveTodo = function(todo){
    TodoService.create(todo)
              .then(function(){
                $scope.newTodo = {};
                getTodos();
              });
  }
  $scope.deleteTodo = function(todo){
      TodoService.delete(todo._id)
                .then(function(){
                  getTodos();
                });
  }

  $scope.editTodo = function(todo){
    $scope.isEditing = !$scope.isEditing;
    $scope.editingTodo = todo;
  }

  $scope.updateTodo = function(todo){
    TodoService.update(todo._id, todo)
              .then(function(){
                getTodos();
                $scope.isEditing = false;
              });
  }
  function getTodos(){
    TodoService.read()
                .then(function(response){
                  $scope.todos = response;
                  console.log($scope.todos);
                });
  }

}
