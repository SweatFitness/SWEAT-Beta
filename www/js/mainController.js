angular.module('starter.controllers')
.controller('MainCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', 
        'Auth', 'UsersList', function($scope, $state, $ionicSideMenuDelegate, Auth, UsersList) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
}]);
