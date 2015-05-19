angular.module('ionicApp', ['ionic'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('intro', {
        url: '/',
        templateUrl: 'intro.html',
        controller: 'IntroCtrl'
      });

    $urlRouterProvider.otherwise("/");

  })

  .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

    $scope.data = {
      numViewableSlides : 0,
      slideIndex : 0,
      initialInstruction : true,
      secondInstruction : false,
      slides : [
        {
          'template' : 'firstSlide.html',
          'viewable' : true
        },

        {
          'template' : 'bonusSlide.html',
          'viewable' : false
        },

        {
          'template' : 'secondSlide.html',
          'viewable' : true
        },

        {
          'template' : 'thirdSlide.html',
          'viewable' : true
        }
      ]
    };

    var countSlides = function() {
      $scope.data.numViewableSlides = 0;

      _.forEach($scope.data.slides, function(slide) {
        if(slide.viewable === true) $scope.data.numViewableSlides++;
      })

      console.log($scope.data.numViewableSlides + " viewable slides");

    }

    countSlides();

    // Called to navigate to the main app
    $scope.startApp = function() {
      $state.go('main');
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.showBonus = function() {
      var index = _.findIndex($scope.data.slides, { template : 'bonusSlide.html' });
      $scope.data.slides[index].viewable = true;
      countSlides();
      $scope.data.initialInstruction = false
      $scope.data.secondInstruction = true;

      $ionicSlideBoxDelegate.update();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {

      $scope.data.slideIndex = index;
    };

  });