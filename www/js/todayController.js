angular.module('starter.controllers')
.controller('TodayCtrl', ['$scope', '$state', '$ionicHistory', '$http', 'Auth', 'UsersList', function($scope, $state, $ionicHistory, $http, Auth, UsersList) {
    var messageQueue = new Firebase('https://sweatfitness.firebaseio.com/messageQueue');
    $scope.getUserName = function(uid) {
        return UsersList.$getRecord(uid).firstname + " " + UsersList.$getRecord(uid).lastname;
    }

    $scope.getPhoneNum = function(uid) {
        return UsersList.$getRecord(uid).phone;
    }


    $scope.click = function() {
        console.log('test test test test test');
    }

    $scope.goHome = function() {
        $state.go('main.home');
    }

    $scope.isToday = function(dateStr) {
        console.log('Checking:' + dateStr);
        return dateStr == (new Date()).toDateString();
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
            var workoutsRef = new Firebase('https://sweatfitness.firebaseio.com/workouts');
            var usersRef = new Firebase('https://sweatfitness.firebaseio.com/user');
            var id = workoutsRef.child(match.id).child('requests').push({
                'from_phone': $scope.getPhoneNum(Auth.$getAuth().uid),
                'to_name': $scope.getUserName(match.ownerUid),
                'from_name': $scope.getUserName(Auth.$getAuth().uid),
                'location': match.location,
                'at': match.start,
                'date': match.date
            });
            usersRef.child(match.ownerUid).child('recent_request').set({
                'workout': match.id,
            });
            $state.go('main.home');
        });
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
                            console.log(id);
                            today.push({
                            'id': id,
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
