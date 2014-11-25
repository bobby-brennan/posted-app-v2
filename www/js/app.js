var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate']);

// CONTROLLERS ============================================
// home page controller
console.log('init feed controller');
angularApp.controller('feedController', function($scope) {
    console.log('making feed controller');
    $scope.pageClass = 'page-feed';
    $scope.articles = [{title: "Loading..."}];
    $scope.openUrl = app.openUrl;

    $scope.loadData = function() {
      console.log('load data feed');
      if (!window.device) {
        console.log('setting callback');
        app.onDevReady = $scope.loadData;
        return;
      } 
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
    $scope.loadData();
});

angularApp.controller('topicController', function($scope) {
    $scope.pageClass = 'page-topic';
    $scope.topicName = $('body').scope().topicName;
    $scope.topicId = $('body').scope().topicId;
    $scope.articles = [{title: "Loading..."}];
    $scope.openUrl = app.openUrl;

    $scope.delete = function() {
      console.log('delete!');
      $('.topic-icon').switchClass('mdi-action-delete', 'mdi-av-loop icon-spin');
      server.deleteTopic($scope.topicId, function() {
        console.log('deleted!');
        $('body').scope().selected = 'topics';
        $('body').scope().$apply();
      });
    }

    $scope.loadData = function(){
      console.log('getting topic articles');
      server.getTopicArticles($scope.topicId, function(articles) {
        console.log('articles:' + articles.length);
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
    console.log('making topics controller');
    $scope.openTopic = function(id, name) {
      console.log('open topic:' + name + ':' + id);
      $('body').scope().topicName = name;
      $('body').scope().topicId = id;
      $('body').scope().selected = 'topic';
    }
    $scope.topics = [{topic: "Loading...", id: -1}];
    $scope.registerListeners = function() {
        $("#add-topic-form").submit(function() {
            console.log("submitting!");
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
      console.log('loading data...');
      server.getSubscriptions(function(topics) {
        console.log('got topics:' + topics.length);
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
});

var BUTTONS = ['feed', 'topics', 'settings'];

var animateButtons = function(selected, onDone) {
  console.log('anim buttons!');
  var finished = 0;
  var animDone = function() {
    console.log('anims:' + finished);
    if (++finished === BUTTONS.length && onDone) onDone(selected);
  }
  for (var i = 0; i < BUTTONS.length; ++i) {
    console.log('set class:' + BUTTONS[i]);
    console.log('sel:' + BUTTONS[i]);
    if (selected === BUTTONS[i]) {
      $('.' + BUTTONS[i] + '-button').switchClass('col-xs-3', 'col-xs-4', 300, animDone);
    } else {
      $('.' + BUTTONS[i] + '-button').switchClass('col-xs-4', 'col-xs-3', 300, animDone);
    }
  }
  console.log('set classes');
}

angularApp.controller('navbar', function($scope) {
    $scope.buttons = ['feed', 'topics', 'settings'];
    $scope.selected = 'topics';
    $scope.slides = [{name: 'feed'}, {name: 'topics'}, {name: 'settings'}]
    $scope.openPage = function(page) {
       $('body').scrollTop();
       animateButtons(page, function(pageloaded) {
         console.log('animation done!');
         // Hack alert: deferring scope change until after anim kills major jank
         // deferring an extra 15ms reduces a small click at the end of animation
         setTimeout(function() {
           $scope.selected = pageloaded;
           $scope.$apply();
         }, 15);
       });
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
