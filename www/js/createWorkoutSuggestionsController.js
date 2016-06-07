angular.module('starter.controllers')
.controller('CreateWorkoutSuggestionsCtrl', ['$scope', '$state', '$stateParams', '$http', 'Auth', 'UsersList', 'Workouts', function($scope, $state, $stateParams, $http, Auth, UsersList, Workouts) {
    var messageQueue = new Firebase('https://sweatfitness.firebaseio.com/messageQueue');

	$scope.$on('$ionicView.beforeEnter', function() {
        $scope.workoutModel = $stateParams.workoutModel;
        console.log($scope.workoutModel);
    });

    $scope.createWorkout_prev = function() {
        $state.go('createworkout-numpeople', {workoutModel: $scope.workoutModel});
    }

    $scope.createWorkout = function() {
        Workouts.$add({
            owner: Auth.$getAuth().uid,
            location: $scope.workoutModel.location,
            maxpeople: $scope.workoutModel.numpeople,
            numpeople: 0,
            date: $scope.workoutModel.pickedDate,
            startTime: $scope.workoutModel.startTime,
            endTime: $scope.workoutModel.endTime,
            types: $scope.workoutModel.workoutTypes
        });
        $state.go('main.home');
    }

    $scope.sendRequest = function(match) {
        var name = $scope.getUserName(Auth.$getAuth().uid);
        $http({
            method: 'GET',
            url: 'https://aqueous-ocean-69673.herokuapp.com/sendText',
            // FOR DEBUGGING: 
            // url: 'http://localhost:5000/sendText',
            params: {
                'num': $scope.getPhoneNum(match.ownerUid),
                'msg': '[SWEAT] ' + name + ' wants to work out with you at ' + match.location + ' on ' + match.date + ', ' + match.start + '! Reply to this message with \'Yes\' if you want to work out with ' + name
            }
        }).then(function() {
            messageQueue.child(match.ownerUid).push({
                'from_phone': $scope.getPhoneNum(Auth.$getAuth().uid),
                'to_name': $scope.getUserName(match.ownerUid),
                'from_name': $scope.getUserName(Auth.$getAuth().uid),
                'location': match.location,
                'at': match.start,
                'date': match.date
            });
            $state.go('main.home');
        });
    }

    $scope.getPhoneNum = function(uid) {
        return UsersList.$getRecord(uid).phone;
    }

    $scope.getUserName = function(uid) {
        return UsersList.$getRecord(uid).firstname + " " + UsersList.$getRecord(uid).lastname;
    }

}]);