angular.module('starter.controllers', [])
.factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
    var usersRef = new Firebase('https://sweatfitness.firebaseio.com/users');
    return $firebaseAuth(usersRef);
}])

.factory('UsersList', ['$firebaseArray', function($firebaseArray) {
    var usersRef = new Firebase('https://sweatfitness.firebaseio.com/user');
    return $firebaseArray(usersRef);
}])

.factory('Workouts', ['$firebaseArray', function($firebaseArray) {
    var workoutsRef = new Firebase('https://sweatfitness.firebaseio.com/workouts');
    return $firebaseArray(workoutsRef);
}])
