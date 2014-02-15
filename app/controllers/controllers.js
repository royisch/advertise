'use strict'

var advertiseControllers = angular.module('advertiseControllers', []);

advertiseControllers.controller('loginCtrl', ['$scope','$http','$location',
    function($scope, $http,$location) {

        $scope.loginToFacebook = function(){
            $location.path("/auth/facebook");
        }

    }]);


advertiseControllers.controller('landingCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
    }
]);

