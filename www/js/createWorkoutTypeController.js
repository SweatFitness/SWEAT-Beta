angular.module('starter.controllers')
.controller('CreateWorkoutTypeCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

	$scope.$on('$ionicView.beforeEnter', function() {
        $scope.workoutModel = $stateParams.workoutModel;
        console.log($scope.workoutModel);
    });

    $scope.createWorkout_next = function() {
        $state.go('createworkout-numpeople', {workoutModel: $scope.workoutModel});
    }

    $scope.createWorkout_prev = function() {
        $state.go('createworkout-location', {workoutModel: $scope.workoutModel});
    }

    $scope.saveWorkoutTypes = function() {
        $scope.workoutModel.workoutTypes = $scope.formWorkoutTypes();
        $scope.createWorkout_next();
    }

    $scope.formWorkoutTypes = function() {
        console.log($scope.workoutModel.workouts);
        var types = [];
        // This is super jank but whatever
        for (var workout in $scope.workoutModel.workouts.cardio) {
            if($scope.workoutModel.workouts.cardio.hasOwnProperty(workout)) {
                types.push(workout);
            }
        }
        for (var workout in $scope.workoutModel.workouts.weight) {
            if($scope.workoutModel.workouts.weight.hasOwnProperty(workout)) {
                types.push(workout);
            }
        }
        console.log(types);
        return types;
    }

    $scope.getUserName = function(uid) {
        return UsersList.$getRecord(uid).firstname + " " + UsersList.$getRecord(uid).lastname;
    }

}]);