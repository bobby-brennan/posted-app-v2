var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate']);

angularApp.config(function($routeProvider) {

    $routeProvider
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
    	})
        .otherwise({
            redirectTo: '/feed'
        });

});

var expandButton = function(button) {
  console.log('expanding:' + button);
  $('#navbar').scope().selected = button;
  //$('#navbar').scope().$apply();
}

// CONTROLLERS ============================================
// home page controller
angularApp.controller('feedController', function($scope) {
    $scope.pageClass = 'page-feed';
    $scope.loadData = function() {
      console.log('getting articles...');
      server.getUserArticles(function(articles) {
        console.log('articles:' + articles.length);
        if (!articles || articles.length == 0) {
          articles = [{category: "Nothing yet..."}];
        }
        $scope.userArticles = articles;
        //$scope.$apply();
      });
    };
    $scope.$on("$viewContentLoaded", function() {
      console.log("CONTENT LOAD");
      if (!window.device) {
        app.onDevReady = $scope.loadData;
      } else {
        $scope.loadData();
      }
      expandButton('feed');
    });
});

angularApp.controller('topicController', function($scope) {
    $scope.pageClass = 'page-topic';
    $scope.loadData = function(){};
    $scope.$on("$viewContentLoaded", function() {
      if (!window.device) {
        app.onDevReady = $scope.loadData;
      } else {
        $scope.loadData();
      }
    })
});

// about page controller
angularApp.controller('topicsController', function($scope) {
    $scope.pageClass = 'page-subs';
    $scope.loadData = function(){};
    $scope.$on("$viewContentLoaded", function() {
      if (!window.device) {
        app.onDevReady = $scope.loadData;
      } else {
        $scope.loadData();
      }
      expandButton('topics');
    })
});

angularApp.controller('settingsController', function($scope) {
    $scope.pageClass = 'page-settings';
    $scope.loadData = function(){};
    $scope.$on("$viewContentLoaded", function() {
      if (!window.device) {
        app.onDevReady = $scope.loadData;
      } else {
        $scope.loadData();
      }
      expandButton('settings');
    })
});

angularApp.controller('navbar', function($scope) {
    $scope.selected = "feed";
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
