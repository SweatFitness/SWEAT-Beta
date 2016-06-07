angular.module('starter.controllers')
.controller('CreateWorkoutLocationCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$scope.locationList = [
        { text: "SPAC", value: "SPAC" },
        { text: "Blom", value: "Blom" },
        { text: "Patten", value: "Patten" }
    ];

	$scope.$on('$ionicView.beforeEnter', function() {
        $scope.workoutModel = $stateParams.workoutModel;
        console.log($scope.workoutModel);
    });

    $scope.createWorkout_next = function() {
        $state.go('createworkout-type', {workoutModel: $scope.workoutModel});
    }

    $scope.createWorkout_prev = function() {
        $state.go('createworkout-datetime', {workoutModel: $scope.workoutModel});
    }

    $scope.updateLocation = function(location) {
        $scope.workoutModel.location = location.value;
    }
}]);