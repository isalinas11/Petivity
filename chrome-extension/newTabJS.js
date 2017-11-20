'use strict';

controllerName.controller('NewTabController', ['$scope', '$resource',
   function ($scope, $resource) {
       
      $scope.main.crabObject = {imageFile: filename.exe};
       $scope.main.interests = [];
       $scope.main.blockedWebsites = [];
       
       $scope.main.petArray = [crabObject, dogObject, TurtleObject];
       
       $scope.main.blockType = hard;
           

       /*
        <ng-image {{$scope.main.selectedPet}}>
       */
       /*

       var UsersModel = $resource('/user/list');
       var usersModel = UsersModel.query({}, function (){

           $scope.main.selectedPet = selectedPet;
        
        Function to start blocking of websites
        $scope.startBlocking = function(){
        ///function to start blocking websites
        }
        
       Fuction to  add websites
        $scope.AddWebsites = function(website){
        $scope.main.blockedWebsites.push(websites);
        }
        
        Function to select a pet
        $scope.selectPet = function(pet){
        $scope.main.selectedPet = pet;
        
        }
        
        Function to go to the settings section
        $scope.goToSettings = function(){
        
        }
        
        $scope.selectHardOrSoftBlock = function(blockType){
            $scope.main.blockType = blockType;
        }
        
        $scope.addInterests = function(interest){
            $scope.main.interests.push(websites);

        }
        
        $scope.EnableDisableWebsites = function(){
        
        }
        
       
       });
       */

   }]);

