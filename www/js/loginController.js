angular.module('starter.controllers')
.controller('LoginCtrl', ['$scope', '$state', '$ionicModal', '$ionicSlideBoxDelegate', 'Auth', 'UsersList', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate, Auth, UsersList) {
    $scope.data = {};
    $scope.usersRef = new Firebase('https://sweat-fitness.firebaseio.com/users');

    $ionicModal.fromTemplateUrl('templates/signup-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        console.log('test');
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

    $scope.login = function(){
        Auth.$authWithPassword({
            email: $scope.data.email,
            password: $scope.data.password
        }).then(function(authData) {
            console.log('Authenticated successfully with payload: ', authData);
            $state.go('main.home');
        }).catch(function(error) {
            console.log('Login failed with error: ', error);
        });
    };

    $scope.signupEmail = function() {
        //TODO: rewrite this function
        //TODO: actually, separate this into another controller
        Auth.$createUser({
            email: $scope.data.email,
            password: $scope.data.password
        }).then(function(userData) {
            console.log('Successfully created user with uid: ', userData);
            $scope.usersRef.child(userData.uid).set({
                provider: 'password',
                firstname: $scope.data.firstname,
                lastname: $scope.data.lastname
            });
            $scope.loginEmail();
        }).catch(function(error) {
            console.log('User creation failed with error: ', error);
        });
    };
    $scope.cancelSignup = function() {
        $ionicHistory.goBack();
    };
}]);
