"use strict";

/**
 * Create an angular module called 'petivityApp' and assign it to a DOM property with the same name.
 * The [] argument specifies module is to be created and doesn't require any other module.
 */
var petivityApp = angular.module('petivityApp', []);
/**
 * Create a controller named 'MainController'.  The array argument specifies the controller
 * function and what dependencies it has.  We specify the '$scope' service so we can have access
 * to the angular scope of view template.
 */
petivityApp.controller('MainController', ['$scope', function($scope) {
   // We defined an object called 'main' with a single property 'title' that is used
   // by the html view template to get the page's title in the browser tab.
   $scope.main = {};
   $scope.main.tasks = window.petivitymodels.tasksModel();
   /*$scope.main.title = 'CS142 Project #4';
   $scope.main.viewExample = 'True';
   $scope.main.viewStates = '';

   $scope.main.switchView = function(num) {
       console.log(num);
       if (num === '1') {
          $scope.main.viewStates = '';
          $scope.main.viewExample = 'True';
       } else {
          $scope.main.viewStates = 'True';
          $scope.main.viewExample = '';
       }
   };*/
}]);