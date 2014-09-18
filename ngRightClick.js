/**
 * Created by wangyz on 14-9-18.
 */

'use strict';
angular.module("webnoteApp")
  .directive('ngRightClick', ['$parse', function($parse) {
    return function(scope, element, attrs) {
      var fn = $parse(attrs.ngRightClick);
      element.bind('contextmenu', function(event) {
        scope.$apply(function() {
          event.preventDefault();
          fn(scope, {$event: event});
        });
      });
    };
  }]);