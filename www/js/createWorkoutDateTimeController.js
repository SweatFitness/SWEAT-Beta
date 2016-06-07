angular.module('starter.controllers')
.controller('CreateWorkoutDateTimeCtrl', ['$scope', '$state', '$stateParams', 'ionicDatePicker', 'ionicTimePicker', function($scope, $state, $stateParams, ionicDatePicker, ionicTimePicker) {
	$scope.$on('$ionicView.beforeEnter', function() {
		console.log($stateParams.workoutModel);
        $scope.workoutModel = $stateParams.workoutModel;
        console.log($scope.workoutModel);
    });

    $scope.createWorkout_next = function() {
        $state.go('createworkout-location',{workoutModel: $scope.workoutModel});
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
                $scope.workoutModel.startTime = epochToUTC(selectedTime);
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
                $scope.workoutModel.endTime = epochToUTC(selectedTime);
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
            $scope.workoutModel.pickedDate = date.toDateString();
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

    $scope.$on('resetModel', function() {
        ipObj2 = {
            callback: function (val) {      //Mandatory
                if (typeof (val) === 'undefined') {
                } else {
                    var selectedTime = new Date(val * 1000);
                    $scope.workoutModel.startTime = epochToUTC(selectedTime);
                }
            },
            inputTime: 50400,   //Optional
            format: 12,         //Optional
            step: 15,           //Optional
            setLabel: 'Set Start Time'    //Optional
        };
        ipObj3 = {
            callback: function (val) {      //Mandatory
                if (typeof (val) === 'undefined') {
                } else {
                    var selectedTime = new Date(val * 1000);
                    $scope.workoutModel.endTime = epochToUTC(selectedTime);
                }
            },
            inputTime: 50400,   //Optional
            format: 12,         //Optional
            step: 15,           //Optional
            setLabel: 'Set End Time'    //Optional
        };
        ipObj1 = {
            callback: function (val) {  //Mandatory
                date = new Date(val);
                $scope.workoutModel.pickedDate = date.toDateString();
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
    })
    
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

}]);