'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('memoryGameApp', []);
angular.module('StroopGame', ['ui']);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'memoryGameApp',
    'StroopGame',
    'ngRoute',
    'ngCookies'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/color', {
            controller: 'StroopCtrl',
            templateUrl: 'modules/color/views/color.html'
        }) 
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'GameCtrl',
            templateUrl: 'modules/home/views/home.html'
        }) 
        .otherwise({ redirectTo: '/login' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);