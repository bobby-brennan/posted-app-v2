var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate']);

var expandButton = function(button) {
  console.log('expanding:' + button);
  $('body').scope().selected = button;
}

// CONTROLLERS ============================================
// home page controller
console.log('init feed controller');
angularApp.controller('feedController', function($scope) {
    console.log('making feed controller');
    $scope.pageClass = 'page-feed';
    $scope.articles = [{title: "Loading..."}];
    $scope.loadData = function() {
      console.log('getting articles...');
      server.getUserArticles(function(articles) {
        console.log('articles:' + articles.length);
        if (!articles) {
          articles = [{title: "Error retrieving feed", url: "#"}];
        } else if (articles.length == 0) {
          articles = [{title: "Nothing yet...", url: "#"}];
        }
        $scope.articles = articles;
        $scope.$apply();
      });
    };
    if (window.device) {
      console.log('device ready');
      $scope.loadData();
    } else {
      app.onDevReady = $scope.loadData;
    }
});

angularApp.controller('topicController', function($scope) {
    $scope.pageClass = 'page-topic';
    $scope.loadData = function(){};
});

// about page controller
angularApp.controller('topicsController', function($scope) {
    $scope.pageClass = 'page-topics';
    console.log('making topics controller');
    $scope.topics = [{topic: "Loading...", id: -1}];
    $scope.loadData = function(){
      console.log('loading data...');
      server.getSubscriptions(function(topics) {
        console.log('got topics:' + topics.length);
        if (!topics) {
          topics = [{topic: "Error retrieving topics", id:-1}];
        } else if (topics.length === 0) {
          topics = [{topic: "Add some topics above to get started!", id:-1}];
        }
        $scope.topics = topics;
        $scope.$apply();
      });
    };
    if (window.device) {
      console.log('device ready');
      $scope.loadData();
    } else {
      app.onDevReady = $scope.loadData;
    }
});

angularApp.controller('settingsController', function($scope) {
    $scope.pageClass = 'page-settings';
    $scope.loadData = function(){};
});

angularApp.controller('navbar', function($scope) {
    $scope.selected = "feed";
    $scope.slides = [{name: 'feed'}, {name: 'topics'}, {name: 'settings'}]
    $scope.openPage = function(page) {
       expandButton(page);
       console.log('getting scope');
       var inner = $('.p-' + $scope.selected).scope();
       console.log('sel:' + '.p-' + $scope.selected);
       console.log('elem:' + angular.element($('.p-' + $scope.selected)))
       console.log('scope:' + JSON.stringify(inner));
       //scope.loadData();
    }
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
