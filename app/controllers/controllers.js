'use strict'

var advertiseControllers = angular.module('advertiseControllers', []);

advertiseControllers.controller('loginCtrl', ['$rootScope','$scope','$http','$location',
    function($rootScope,$scope,$http,$location) {

        $scope.loginToFacebook = function(){
            $location.path("/auth/facebook");

        };

    }]);


advertiseControllers.controller('landingCtrl', ['$scope', '$routeParams','$http',
    function($scope, $routeParams,$http) {


        $http.get('/service/user')
            .then(function(user) {
                //resolve the promise as the data
                $scope.user = user.data;
            });

        $scope.logout = function(){
            $http.get('/logout')
        }
    }
]);

