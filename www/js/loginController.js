angular.module('starter.controllers')
.controller('LoginCtrl', ['$scope', '$state', '$ionicModal', '$ionicSlideBoxDelegate', 'Auth', 'UsersList', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate, Auth, UsersList) {
    $scope.data = {};

    var __initUserModel = function() {
        $scope.userModel = {};

        $scope.userModel.goal = {};
        $scope.userModel.goal.lean = false;
        $scope.userModel.goal.fit = false;
        $scope.userModel.goal.muscles = false;
        $scope.userModel.email={};
        $scope.userModel.email.txt="";
        $scope.userModel.firstname={};
        $scope.userModel.firstname.txt="";
        $scope.userModel.lastname={};
        $scope.userModel.lastname.txt="";
        $scope.userModel.password={};
        $scope.userModel.password.txt="";
        $scope.userModel.phone={};
        $scope.userModel.phone.txt="";


        $scope.userModel.gender = "";
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        __initUserModel();
    });

    $scope.signup = function() {
        $state.go('signup-basicInfo',{userModel:$scope.userModel});
    }

    $scope.loginEmail = function(){
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

    $scope.cancelSignup = function() {
        $ionicHistory.goBack();
    };
}]);
