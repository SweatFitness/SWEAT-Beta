angular.module('starter.controllers')
.controller('MainCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', '$ionicModal', '$ionicSlideBoxDelegate', '$ionicPopup', 'ionicDatePicker', 'Auth', 'UsersList', function($scope, $state, $ionicSideMenuDelegate, $ionicModal, $ionicSlideBoxDelegate, $ionicPopup, ionicDatePicker, Auth, UsersList) {
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

    var ipObj1 = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        },
        disabledDates: [            //Optional
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(2012, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'modal'       //Optional
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
}]);
