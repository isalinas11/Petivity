'use strict';

/*
 * Load the model data of the problem 2 of cs142's project4.
 * We load into the property cs142models.statesModel a function that returns  an array of
 * strings with the names of the states.
 *
 * See README.md for more details
 */

var petivitymodels;

if (!petivitymodels) {
   petivitymodels = {};
}

petivitymodels.tasksModel = function () {
   var task1 = {name: "Laundry" , days: 0};
   var task2 = {name: "Math homework", days: 2};
   var task3 = {name: "Interview prep", days: 2};
   var task4 = {name: "Meet advisor", days: 3};

   return [task1, task2, task3, task4];
};

