angular.module('starter.controllers')
.controller('RequestCtrl', ['$scope', '$state', '$ionicHistory', '$ionicPopup', '$http', 'Auth', 'UsersList', function($scope, $state, $ionicHistory, $ionicPopup, $http, Auth, UsersList) {
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

    $scope.showRequestSentAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Request Sent!',
            template: 'Your workout request is sent.'
        });

        alertPopup.then(function(res) {
            $state.go('main.home');
        });
    };
    
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
            workoutsRef.child(match.id).child('requests').push({
                'from_phone': $scope.getPhoneNum(Auth.$getAuth().uid),
                'to_name': $scope.getUserName(match.ownerUid),
                'from_name': $scope.getUserName(Auth.$getAuth().uid),
                'location': match.location,
                'at': match.start,
                'date': match.date
            }, function(req) {
                usersRef.child(match.ownerUid).child('recent_request').set({
                    'workout': match.id,
                    'request': req
                });
            });
            $scope.showRequestSentAlert();
        });
    }


    $scope.yesMatch = false;

    $scope.checkRequests = function() {
        // Check whether I have a pending request
        var workoutsRef = new Firebase('https://sweatfitness.firebaseio.com/workouts');
        workoutsRef.once('value', function(snapshot) {
            var workouts = snapshot.val(); 
            if (Object.keys(workouts).length == 0) {
                return;
            }
            var allRequests = [];
            var myUid = Auth.$getAuth().uid;
            for (var id in workouts) {
                if (workouts.hasOwnProperty(id)) {
                    var workout = workouts[id];
                    if (workout.owner != myUid) {
                        continue;
                    }
                    if ('requests' in workout) {
                        for (var rid in workout.requests) {
                            if (workout.requests.hasOwnProperty(rid)) {
                                allRequests.push(workout.requests[rid]);
                            }
                        }
                    }
                    $scope.yesMatch = true;
                }
            }
            $scope.allRequests = allRequests;
            console.log(allRequests);
        });
    }

    $scope.loadAllRequests = function() {
        var userRef = new Firebase('https://sweatfitness.firebaseio.com/user');
        userRef.child(Auth.$getAuth().uid).once('value', function(snapshot) {
            console.log(snapshot.val());
        });
    }
}])
