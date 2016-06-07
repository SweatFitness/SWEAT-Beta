angular.module('starter.controllers')
.controller('signupGoalsCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams, Auth, UsersList) {
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
            email: $scope.userModel.email,
            password: $scope.userModel.password
        }).then(function(userData) {
            console.log('Successfully created user with uid: ', userData);
            $scope.usersRef.child(userData.uid).set({
                provider: 'password',
                firstname: $scope.userModel.firstname,
                lastname: $scope.userModel.lastname,
                phone: $scope.userModel.phone,
                gender: $scope.userModel.gender,
                experience: $scope.userModel.experience,
                goal: $scope.userModel.goal;
                p_expectations: $scope.userModel.partner_expectation,
                a_expectations: $scope.userModel.app_expectation,
            });
            $scope.phoneToUser.child('+1' + $scope.userModel.phone).set(userData.uid);
            $scope.$emit('signupComplete', {email: $scope.userModel.email, password: $scope.userModel.password});
        }).catch(function(error) {
            console.log('User creation failed with error: ', error);
        });
    };
}])