var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate']);

angularApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'feed.html',
            controller: 'feedController'
        })
    	.when('/feed', {
            templateUrl: 'feed.html',
            controller: 'feedController'
    	})
        .when('/topic', {
            templateUrl: 'topic.html',
            controller: 'topicController'
        })
    	.when('/topics', {
    	    templateUrl: 'topics.html',
            controller: 'topicsController'
    	})
    	.when('/settings', {
            templateUrl: 'settings.html',
            controller: 'settingsController'
    	});

});

// CONTROLLERS ============================================
// home page controller
angularApp.controller('feedController', function($scope) {
    $scope.pageClass = 'page-feed';
});

angularApp.controller('topicController', function($scope) {
    $scope.pageClass = 'page-topic';
});

// about page controller
angularApp.controller('topicsController', function($scope) {
    $scope.pageClass = 'page-subs';
});

// contact page controller
angularApp.controller('settingsController', function($scope) {
    $scope.pageClass = 'page-settings';
});

angularApp.controller('feedButton', function($scope) {
    $scope.icon = 'mdi-action-system-update-tv';
    $scope.dest = '#feed';
    $scope.name = 'Feed';
    $scope.click = function() {
      alert('click');
    };
});

angularApp.controller('topicsButton', function($scope) {
    $scope.icon = 'mdi-action-subject';
    $scope.dest = '#topics';
    $scope.name = 'Topics';
    $scope.click = function() {
      alert('click');
    };
});

angularApp.controller('settingsButton', function($scope) {
    $scope.icon = 'mdi-action-settings';
    $scope.dest = '#settings';
    $scope.name = 'Settings';
    $scope.click = function() {
      alert('click');
    };
});
