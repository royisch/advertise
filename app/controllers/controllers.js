'use strict'

var advertiseControllers = angular.module('advertiseControllers', []);

advertiseControllers.controller('loginCtrl', ['$rootScope','$scope','$http','$location',
    function($rootScope,$scope,$http,$location) {
        $scope.loginToFacebook = function(){
        };

        $scope.loginToGoogle = function(){
        };
    }]);


advertiseControllers.controller('landingCtrl', ['$scope', '$routeParams','$http','$rootScope',
    function($scope, $routeParams,$http,$rootScope) {

        $http.get('/service/user'+$routeParams.vendor)
            .then(function(user) {
                //resolve the promise as the data
                $scope.user = user.data;
            });

        $scope.logout = function(){
            $http.get('/logout')
        }
    }
]);

