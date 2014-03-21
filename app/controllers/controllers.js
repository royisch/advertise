'use strict'

var advertiseControllers = angular.module('advertiseControllers', []);

advertiseControllers.controller('loginCtrl', ['$rootScope','$scope','$http','$location',
    function($rootScope,$scope,$http,$location) {

        $scope.loginToFacebook = function(){
            $rootScope.loggedInVendor="fb";

        };

        $scope.loginToGoogle = function(){
            $rootScope.loggedInVendor="gl";
        };

    }]);


advertiseControllers.controller('landingCtrl', ['$scope', '$routeParams','$http','$rootScope',
    function($scope, $routeParams,$http,$rootScope) {
        console.log('/service/user'+$rootScope.loggedInVendor);

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

