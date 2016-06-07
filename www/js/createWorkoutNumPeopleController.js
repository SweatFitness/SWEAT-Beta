angular.module('starter.controllers')
.controller('CreateWorkoutNumPeopleCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'UsersList', 'Workouts', function($scope, $state, $stateParams, Auth, UsersList, Workouts) {

    $scope.numPeopleList = [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "More than 4", value: 100 }
    ];

    $scope.updateNumPeople = function(numpeople) {
        $scope.workoutModel.numpeople = numpeople.value;
    }

	$scope.$on('$ionicView.beforeEnter', function() {
        $scope.workoutModel = $stateParams.workoutModel;
        console.log($scope.workoutModel);
    });

    $scope.createWorkout_next = function() {
        $state.go('createworkout-suggestions', {workoutModel: $scope.workoutModel});
    }

    $scope.createWorkout_prev = function() {
        $state.go('createworkout-type', {workoutModel: $scope.workoutModel});
    }

    $scope.findSuggestions = function() {
        var workoutsRef = new Firebase('https://sweatfitness.firebaseio.com/workouts');
        workoutsRef.once('value', function(snapshot) {
            allWorkouts = snapshot.val();
            match = [];
            if (allWorkouts) {
                for (var id in allWorkouts) {
                    if (allWorkouts.hasOwnProperty(id)) {
                        var workout = allWorkouts[id];

                        if (workout.date != $scope.workoutModel.pickedDate) {
                            continue;
                        }
                        if (!inBetween(workout)) {
                            continue;
                        }
                        if (workout.owner == Auth.$getAuth().uid) {
                            continue;
                        }
                        if (workout.numpeople >= workout.maxpeople) {
                            continue;
                        }
                        $scope.yesMatch = true;
                        match.push({
                            'ownerUid': workout.owner,
                            'name': $scope.getUserName(workout.owner),
                            'start': workout.startTime,
                            'end': workout.endTime,
                            'location': workout.location,
                            'numpeople': workout.numpeople,
                            'date': workout.date,
                            'types': workout.types
                        });
                    }
                }
                $scope.workoutModel.matches = match;
                $scope.workoutModel.noMatch = match.length === 0;
                $scope.createWorkout_next();
            } else {
                $scope.workoutModel.noMatch = true;
                $scope.workoutModel.matches = [];
                $scope.createWorkout_next();
            }
        });
    }

    $scope.getUserName = function(uid) {
        return UsersList.$getRecord(uid).firstname + " " + UsersList.$getRecord(uid).lastname;
    }

    var inBetween = function(workout) {
        if (to24Hours(workout.startTime) > to24Hours($scope.workoutModel.endTime)) {
            return false;
        } else if (to24Hours($scope.workoutModel.startTime) > to24Hours(workout.endTime)) {
            return false;
        }
        return true;
    }

    var to24Hours = function(timeStr) {
        if (timeStr.indexOf('AM') < 0) { // if PM,
            var time = timeStr.replace('PM', ''),
                hour = time.split(':')[0],
                min = time.split(':')[1];

            if (hour != '12') {
                return (parseInt(hour) + 12) + ':' + min;
            } else {
                return hour + ':' + min;
            }
        } else {
            return timeStr.replace('AM', '');
        }
    }
}]);