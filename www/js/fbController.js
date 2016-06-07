angular.module('starter.controllers')
.controller('NewFbCtrl', ['$scope', '$state', '$ionicModal', '$ionicSlideBoxDelegate', 'Auth', 'UsersList', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate, Auth, UsersList) {
    $scope.data = {};
    $scope.registerNewUserWithFB = function() {
        var phone = new Firebase('https://sweatfitness.firebaseio.com/user/' + Auth.$getAuth().uid + '/phone');
        phone.set($scope.data.phone, function() {
            $state.go('main.home');
        });
    }
}]);

