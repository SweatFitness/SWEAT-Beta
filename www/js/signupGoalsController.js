angular.module('starter.controllers')
.controller('signupGoalsCtrl', ['$scope', '$state', '$stateParams', '$rootScope', 'Auth', 'UsersList', function($scope, $state, $stateParams, $rootScope, Auth, UsersList) {
	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.userModel = $stateParams.userModel;
	});

	$scope.usersRef = new Firebase('https://sweatfitness.firebaseio.com/user');
	$scope.phoneToUser = new Firebase('https://sweatfitness.firebaseio.com/phoneToUser');

	$scope.signupEmail = function() {
        //TODO: rewrite this function
        //TODO: actually, separate this into another controller
        // Form list of goals
        Auth.$createUser({
            email: $scope.userModel.email.txt,
            password: $scope.userModel.password.txt
        }).then(function(userData) {
            console.log('Successfully created user with uid: ', userData);
            $scope.usersRef.child(userData.uid).set({
                provider: 'password',
                firstname: $scope.userModel.firstname.txt,
                lastname: $scope.userModel.lastname.txt,
                phone: $scope.userModel.phone.txt,
                gender: $scope.userModel.gender,
                experience: $scope.userModel.experience,
                goal: $scope.userModel.goal
            });
            $scope.phoneToUser.child('+1' + $scope.userModel.phone.txt).set(userData.uid);
            $scope.loginEmail($scope.userModel.email.txt, $scope.userModel.password.txt);
        }).catch(function(error) {
            console.log('User creation failed with error: ', error);
        });
    };

    $scope.loginEmail = function(email, password){
        Auth.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData) {
            console.log('Authenticated successfully with payload: ', authData);
            $state.go('main.home');
        }).catch(function(error) {
            console.log('Login failed with error: ', error);
        });
    };

    $scope.signup_prev = function() {
        $state.go('signup-expertise', {userModel:$scope.userModel});
    }
}])