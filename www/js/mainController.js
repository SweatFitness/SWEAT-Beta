angular.module('starter.controllers')
.controller('MainCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', '$ionicModal', '$ionicSlideBoxDelegate', '$ionicPopup', 'ionicDatePicker', 'ionicTimePicker', 'Auth', 'UsersList', 'Workouts', function($scope, $state, $ionicSideMenuDelegate, $ionicModal, $ionicSlideBoxDelegate, $ionicPopup, ionicDatePicker, ionicTimePicker, Auth, UsersList, Workouts) {
    $scope.pickedDate = 'No workout date chosen yet!';
    $scope.pickedTime = 'No workout time chosen yet!';

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
    }
    var ipObj2 = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                var selectedTime = new Date(val * 1000);
                console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                $scope.pickedTime = selectedTime.toLocaleTimeString();
            }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: 'Set Time'    //Optional
    };

    var ipObj1 = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            date = new Date(val);
            $scope.pickedDate = date.toDateString();
        },
        disabledDates: [            //Optional
        ],
        from: new Date(2012, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'modal'       //Optional
    };

    $scope.openTimePicker = function() {
        ionicTimePicker.openTimePicker(ipObj2);
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
        $scope.selectModal.hide();
    }

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
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

    $scope.createWorkout = function() {
        var workoutsRef = new Firebase('https://sweatfitness.firebaseio.com/workouts');
        Workouts.$add({
            owner: Auth.$getAuth().uid,
            location: $scope.location,
            numpeople: $scope.numpeople,
            date: $scope.pickedDate,
            time: $scope.pickedTime
        });
    }

}]);
