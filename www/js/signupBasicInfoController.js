angular.module('starter.controllers')
.controller('signupBasicInfoCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.userModel = $stateParams.userModel;
	});

	$scope.$on('dismissForm', function() {
		console.log('dismissForm');
		$state.go('login');
	})

	$scope.signup_next = function() {
		$state.go('signup-gender', {userModel:$scope.userModel});
	}

}])