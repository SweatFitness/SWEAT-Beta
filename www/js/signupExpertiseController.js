angular.module('starter.controllers')
.controller('signupExpertiseCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.userModel = $stateParams.userModel;
	});

	$scope.experienceList = [
        { text: "Beginner", value: "beginner" },
        { text: "Intermediate", value: "intermediate" },
        { text: "Expert", value: "expert" }
    ];

    $scope.updateExperience = function(experience) {
        $scope.userModel.experience = experience.value;
    }

    $scope.signup_next = function() {
        $state.go('signup-goals', {userModel:$scope.userModel});
    }

    $scope.signup_prev = function() {
        $state.go('signup-gender', {userModel:$scope.userModel});
    }
}])