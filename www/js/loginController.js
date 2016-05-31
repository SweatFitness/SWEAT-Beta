angular.module('starter.controllers')
.controller('LoginCtrl', ['$scope', '$state', '$ionicModal', '$ionicSlideBoxDelegate', 'Auth', 'UsersList', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate, Auth, UsersList) {
    $scope.data = {};

    // Form variables
    $scope.goal = {};
    $scope.goal.lean = false;
    $scope.goal.fit = false;
    $scope.goal.muscles = false;


    $scope.partner_expectation = {};
    $scope.partner_expectation.goal = false;
    $scope.partner_expectation.gender = false;
    $scope.partner_expectation.level = false;
    $scope.partner_expectation.level = false;

    $scope.app_expectation = {};
    $scope.app_expectation.motivation = false;
    $scope.app_expectation.lessons = false;
    $scope.app_expectation.meet = false;
    $scope.app_expectation.fun = false;

    $scope.genderList = [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" }
    ];

    $scope.updateGender = function(gender) {
        $scope.gender = gender.value;
    }

    $scope.updateExperience = function(experience) {
        $scope.experience = experience.value;
    }

    $scope.experienceList = [
        { text: "Beginner", value: "beginner" },
        { text: "Intermediate", value: "intermediate" },
        { text: "Expert", value: "expert" }
    ];

    $scope.usersRef = new Firebase('https://sweatfitness.firebaseio.com/user');
    $scope.phoneToUser = new Firebase('https://sweatfitness.firebaseio.com/phoneToUser');


    // This brings up signup modals
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

    $scope.signupEmail = function() {
        //TODO: rewrite this function
        //TODO: actually, separate this into another controller
        // Form list of goals
        Auth.$createUser({
            email: $scope.data.email,
            password: $scope.data.password
        }).then(function(userData) {
            console.log('Successfully created user with uid: ', userData);
            $scope.usersRef.child(userData.uid).set({
                provider: 'password',
                firstname: $scope.data.firstname,
                lastname: $scope.data.lastname,
                phone: $scope.data.phone,
                gender: $scope.gender,
                experience: $scope.goal,
                p_expectations: $scope.partner_expectation,
                a_expectations: $scope.app_expectation,
            });
            $scope.phoneToUser.child('+1' + $scope.data.phone).set(userData.uid);
            $scope.loginEmail();
            $scope.closeModal();
        }).catch(function(error) {
            console.log('User creation failed with error: ', error);
        });
    };
    $scope.cancelSignup = function() {
        $ionicHistory.goBack();
    };
}]);
