var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate']);

angularApp.config(function($routeProvider) {

    $routeProvider
    	.when('/', {
            templateUrl: 'feed.html',
            controller: 'feedController'
    	})
        .when('/topic', {
            templateUrl: 'topic.html',
            controller: 'topicController'
        })
    	.when('/subs', {
    	    templateUrl: 'subs.html',
            controller: 'aboutController'
    	})
    	.when('/settings', {
            templateUrl: 'settings.html',
            controller: 'settingsController'
    	});

});

// CONTROLLERS ============================================
// home page controller
animateApp.controller('feedController', function($scope) {
    $scope.pageClass = 'page-feed';
});

animateApp.controller('topicController', function($scope) {
    $scope.pageClass = 'page-topic';
});

// about page controller
animateApp.controller('subsController', function($scope) {
    $scope.pageClass = 'page-subs';
});

// contact page controller
animateApp.controller('settingsController', function($scope) {
    $scope.pageClass = 'page-settings';
});
