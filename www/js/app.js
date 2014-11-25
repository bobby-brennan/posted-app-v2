var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate']);

// CONTROLLERS ============================================
// home page controller
angularApp.controller('feedController', function($scope) {
    $scope.pageClass = 'page-feed';
    $scope.articles = [{title: "Loading..."}];
    $scope.openUrl = app.openUrl;

    $scope.loadData = function() {
      if (!window.device) {
        app.onDevReady = $scope.loadData;
        return;
      } 
      server.getUserArticles(function(articles) {
        if (!articles) {
          articles = [{title: "Error retrieving feed", url: "#"}];
        } else if (articles.length == 0) {
          articles = [{title: "Nothing yet...", url: "#"}];
        }
        $scope.articles = articles;
        $scope.$apply();
      });
    };
    $scope.loadData();
    console.log('done initing feed controller');
});

angularApp.controller('topicController', function($scope) {
    $scope.pageClass = 'page-topic';
    $scope.topicName = $('body').scope().topicName;
    $scope.topicId = $('body').scope().topicId;
    $scope.articles = [{title: "Loading..."}];
    $scope.openUrl = app.openUrl;

    $scope.delete = function() {
      $('.topic-icon').switchClass('mdi-action-delete', 'mdi-av-loop icon-spin');
      server.deleteTopic($scope.topicId, function() {
        $('body').scope().selected = 'topics';
        $('body').scope().$apply();
      });
    }

    $scope.loadData = function(){
      server.getTopicArticles($scope.topicId, function(articles) {
        if (!articles) {
          articles = [{title: "Error retrieving feed", url: "#"}];
        } else if (articles.length == 0) {
          articles = [{title: "Nothing yet...", url: "#"}];
        }
        for (var i = 0; i < articles.length; ++i) {
          articles[i].category = $scope.topicName;
        }
        $scope.articles = articles;
        $scope.$apply();
      });
    };
    $scope.loadData();
});

// about page controller
angularApp.controller('topicsController', function($scope) {
    $scope.pageClass = 'page-topics';
    $scope.openTopic = function(id, name) {
      $('body').scope().topicName = name;
      $('body').scope().topicId = id;
      $('body').scope().lastSelected = $('body').scope().selected;
      $('body').scope().selected = 'topic';
    }
    $scope.topics = [{topic: "Loading...", id: -1}];
    $scope.registerListeners = function() {
        $("#add-topic-form").submit(function() {
            $('.submit-icon').switchClass('mdi-content-add', 'mdi-av-loop icon-spin');
            server.addTopic($('.topic-input').val(), function() {
              $('.submit-icon').switchClass('mdi-av-loop icon-spin', 'mdi-content-add');
              $scope.loadData()
            });
            return false;
        })
    }
    $scope.loadData = function(){
      if (!window.device) {
        app.onDevReady = $scope.loadData;
        return;
      }
      server.getSubscriptions(function(topics) {
        if (!topics) {
          topics = [{topic: "Error retrieving topics", id:-1}];
        } else if (topics.length === 0) {
          topics = [{topic: "Add some topics above to get started!", id:-1}];
        }
        Marquee.start('.topic-input');
        $scope.$on("$destroy", function() {
          Marquee.stop();
        });
        $scope.topics = topics;
        $scope.$apply();
      });
    };
    $scope.loadData();
});

angularApp.controller('settingsController', function($scope) {
    $scope.pageClass = 'page-settings';
    $scope.loadData = function(){};
    $scope.loadData();
    $scope.onLoad = function() {
      app.initSettingsUi();
    }
});

var BUTTONS = ['feed', 'topics', 'settings'];

var animateButtons = function(selected, onDone) {
  var finished = 0;
  var animDone = function() {
    if (++finished === BUTTONS.length && onDone) onDone(selected);
  }
  for (var i = 0; i < BUTTONS.length; ++i) {
    if (selected === BUTTONS[i]) {
      $('.' + BUTTONS[i] + '-button').switchClass('col-xs-3', 'col-xs-4', 300, animDone);
    } else {
      $('.' + BUTTONS[i] + '-button').switchClass('col-xs-4', 'col-xs-3', 300, animDone);
    }
  }
}

angularApp.controller('navbar', function($scope) {
    $scope.buttons = ['feed', 'topics', 'settings'];
    $scope.selected = 'topics';
    $scope.slides = [{name: 'feed'}, {name: 'topics'}, {name: 'settings'}]
    $scope.openPage = function(page) {
       console.log('scrolling to top...');
       window.scrollTo(0, 0);
       console.log('scrolled');
       animateButtons(page, function(pageloaded) {
         // Hack alert: deferring scope change until after anim kills major jank
         // deferring an extra 15ms reduces a small click at the end of animation
         setTimeout(function() {
           console.log('after button timeout:' + pageloaded);
           $scope.lastSelected = $scope.selected;
           $scope.selected = pageloaded;
           $scope.$apply();
           console.log('applied new page');
         }, 15);
       });
       console.log('done open page setup');
    }
});

angularApp.controller('feedButton', function($scope) {
    $scope.icon = 'mdi-action-system-update-tv';
    $scope.dest = '#feed';
    $scope.name = 'Feed';
});

angularApp.controller('topicsButton', function($scope) {
    $scope.icon = 'mdi-action-subject';
    $scope.dest = '#topics';
    $scope.name = 'Topics';
});

angularApp.controller('settingsButton', function($scope) {
    $scope.icon = 'mdi-action-settings';
    $scope.dest = '#settings';
    $scope.name = 'Settings';
});
