angular.module('starter.controllers')
.controller('MainCtrl', ['$scope', '$state', '$http', '$ionicSideMenuDelegate', '$ionicModal', '$ionicSlideBoxDelegate', '$ionicPopup', 'ionicDatePicker', 'ionicTimePicker', 'Auth', 'UsersList', 'Workouts', function($scope, $state, $http, $ionicSideMenuDelegate, $ionicModal, $ionicSlideBoxDelegate, $ionicPopup, ionicDatePicker, ionicTimePicker, Auth, UsersList, Workouts) {

    $scope.pickedDate = 'Pick a date';
    $scope.startTime = 'Pick a start time';
    $scope.endTime = 'Pick an end time';
    $scope.workouts = {};

    var __initWorkoutModel = function() {
        $scope.workoutModel = {};
        $scope.workoutModel.pickedDate = 'Pick a date';
        $scope.workoutModel.startTime = 'Pick a start time';
        $scope.workoutModel.endTime = 'Pick an end time';
        $scope.workoutModel.location = '';
        $scope.workoutModel.workouts = {};
        $scope.workoutModel.matches = [];
        $scope.workoutModel.noMatch = false;
        $scope.workoutModel.workoutTypes = [];
        $scope.workoutModel.numpeople = '';
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        __initWorkoutModel();
        console.log($scope.workoutModel);
    });

    $scope.createWorkout = function() {
        $state.go('createworkout-datetime',{workoutModel: $scope.workoutModel});
    }

    $scope.showToday = function() {
        $state.go('today');
    }
    $scope.showRequest = function() {
        $state.go('request');
    }

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.notImplemented = function() {
        $ionicPopup.show({
            title: 'Oops',
            template: 'This is not implemented yet!',
            buttons: [
                { text: 'Close' }
            ]
        });
    };
    
    $scope.reset = function() {
        $scope.pickedDate = 'Pick a date';
        $scope.startTime = 'Pick a start time';
        $scope.endTime = 'Pick an end time';
        $scope.matches = [];
        $ionicSlideBoxDelegate.slide(0);
        $scope.selectModal.hide();
    }

}]);
