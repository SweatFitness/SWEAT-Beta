angular.module('starter.controllers')
.controller('MainCtrl', ['$scope', '$state', '$http', '$ionicSideMenuDelegate', '$ionicModal', '$ionicSlideBoxDelegate', '$ionicPopup', 'ionicDatePicker', 'ionicTimePicker', 'Auth', 'UsersList', 'Workouts', function($scope, $state, $http, $ionicSideMenuDelegate, $ionicModal, $ionicSlideBoxDelegate, $ionicPopup, ionicDatePicker, ionicTimePicker, Auth, UsersList, Workouts) {
    var messageQueue = new Firebase('https://sweatfitness.firebaseio.com/messageQueue');

    $scope.pickedDate = 'Pick a date';
    $scope.startTime = 'Pick a start time';
    $scope.endTime = 'Pick an end time';
    $scope.workouts = {};

    $scope.getUserName = function(uid) {
        return UsersList.$getRecord(uid).firstname + " " + UsersList.$getRecord(uid).lastname;
    }
    $scope.showToday = function() {
        $state.go('today');
    }
    $scope.showRequest = function() {
        $state.go('request');
    }

    $scope.getPhoneNum = function(uid) {
        return UsersList.$getRecord(uid).phone;
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

    var showForm = function() {
        $scope.selectModal.show();
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

    var epochToUTC = function(st) {
        var hours = st.getUTCHours(),
            mins = st.getUTCMinutes();
        var AMPM = 'AM';
        if (mins < 10) {
            mins = '0' + mins;
        }
        if (hours > 12) {
            hours -= 12;
            AMPM = 'PM';
        }
        return hours + ':' + mins + ' ' + AMPM;
    };

    var ipObj2 = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
            } else {
                var selectedTime = new Date(val * 1000);
                $scope.startTime = epochToUTC(selectedTime);
            }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: 'Set Start Time'    //Optional
    };

    var ipObj3 = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
            } else {
                var selectedTime = new Date(val * 1000);
                $scope.endTime = epochToUTC(selectedTime);
            }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: 'Set End Time'    //Optional
    };

    var ipObj1 = {
        callback: function (val) {  //Mandatory
            date = new Date(val);
            $scope.pickedDate = date.toDateString();
        },
        disabledDates: [            //Optional
        ],
        from: new Date(2012, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        closeOnSelect: false,       //Optional
        templateType: 'modal'       //Optional
    };
    
    $scope.openStartTimePicker = function() {
        ionicTimePicker.openTimePicker(ipObj2);
    };

    // Fuck me, just make it work
    $scope.openEndTimePicker = function() {
        ionicTimePicker.openTimePicker(ipObj3);
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
    };

    
    $ionicModal.fromTemplateUrl('templates/create-workout-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.selectModal = modal;
        $scope.selectModalSlider = $ionicSlideBoxDelegate.$getByHandle('modalSlider');
        $scope.selectModalSlider.enableSlide(false);
    });

    $scope.closeModal = function() {
        $scope.reset();
    }

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    }

    $scope.reset = function() {
        $scope.pickedDate = 'Pick a date';
        $scope.startTime = 'Pick a start time';
        $scope.endTime = 'Pick an end time';
        $scope.matches = [];
        $ionicSlideBoxDelegate.slide(0);
        $scope.selectModal.hide();
    }

    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    }

    $scope.locationList = [
        { text: "SPAC", value: "SPAC" },
        { text: "Blom", value: "Blom" },
        { text: "Patten", value: "Patten" }
    ];

    $scope.numPeopleList = [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "More than 4", value: 100 }
    ];

    $scope.updateLocation = function(location) {
        $scope.location = location.value;
    }

    $scope.updateNumPeople = function(numpeople) {
        $scope.numpeople = numpeople.value;
    }

    $scope.saveWorkoutTypes = function() {
        $scope.workoutTypes = $scope.formWorkoutTypes();
        $scope.nextSlide();
    }

    $scope.formWorkoutTypes = function() {
        console.log($scope.workouts);
        var types = [];
        // This is super jank but whatever
        for (var workout in $scope.workouts.cardio) {
            if($scope.workouts.cardio.hasOwnProperty(workout)) {
                types.push(workout);
            }
        }
        for (var workout in $scope.workouts.weight) {
            if($scope.workouts.weight.hasOwnProperty(workout)) {
                types.push(workout);
            }
        }
        console.log(types);
        return types;
    }

    $scope.createWorkout = function() {
        var types = $scope.formWorkoutTypes();
        Workouts.$add({
            owner: Auth.$getAuth().uid,
            location: $scope.location,
            maxpeople: $scope.numpeople,
            numpeople: 0,
            date: $scope.pickedDate,
            startTime: $scope.startTime,
            endTime: $scope.endTime,
            types: types
        });
        $scope.closeModal();
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
            $scope.closeModal();
        });
    }

    var inBetween = function(workout) {
        if (to24Hours(workout.startTime) > to24Hours($scope.endTime)) {
            return false;
        } else if (to24Hours($scope.startTime) > to24Hours(workout.endTime)) {
            return false;
        }
        return true;
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

                        if (workout.date != $scope.pickedDate) {
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
                $scope.matches = match;
                $scope.nextSlide();
            } else {
                $scope.noMatch = true;
                $scope.matches = [];
                $scope.nextSlide();
            }
        });
    }
}]);
