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
}])