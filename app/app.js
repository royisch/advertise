/**
 * Created with JetBrains WebStorm.
 * User: schwarro
 * Date: 2/12/14
 * Time: 6:40 PM
 * To change this template use File | Settings | File Templates.
 */

var app = angular.module('app' , ['ngRoute' , 'advertiseControllers']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '../partials/login.html',
                controller: 'loginCtrl'
            }).
            when('/inside', {
                templateUrl: '../partials/landing.html',
                controller: 'landingCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

