angular.module('starter.controllers')
.controller('TodayCtrl', ['$scope', '$state', 'Auth', 'UsersList', function($scope, $state, Auth, UsersList) {
    $scope.getUserName = function(uid) {
        console.log(uid);
        return UsersList.$getRecord(uid).firstname + " " + UsersList.$getRecord(uid).lastname;
    }

    $scope.click = function() {
        console.log('test test test test test');
    }

    $scope.isToday = function(dateStr) {
        console.log('Checking:' + dateStr);
        return dateStr == (new Date()).toDateString();
    }
    $scope.yesMatch = false;

    $scope.loadAllWorkouts = function() {
        var allWorkoutsRef = new Firebase('https://sweatfitness.firebaseio.com/workouts');
        allWorkoutsRef.once('value', function(snapshot) {
            allWorkouts = snapshot.val();
            today = [];
            if (allWorkouts) {
                for (var id in allWorkouts) {
                    if (allWorkouts.hasOwnProperty(id)) {
                        var workout = allWorkouts[id];
                        if ($scope.isToday(workout.date)) {
                            $scope.yesMatch = true;
                            today.push({
                            'ownerUid': workout.owner,
                            'name': $scope.getUserName(workout.owner),
                            'start': workout.startTime,
                            'end': workout.endTime,
                            'location': workout.location,
                            'numpeople': workout.numpeople,
                            'date': workout.date,
                            'types': workout.types
                            });
                        };
                    }
                }
            }
            $scope.today = today;
        });
        console.log(today);
    }
}])
