"use strict"
var app = angular.module("EasingExample", ["Easie"]);

app.factory("$requestAnimationFrame", [
  "$window", "$rootScope", "$timeout", function($window, $rootScope, $timeout) {
    var requestAnimationFrame;
    requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.msRequestAnimationFrame || $window.webkitRequestAnimationFrame || function(cb) {
      return $timeout(cb, 1000 / 60);
    };
    return function(tick) {
      return requestAnimationFrame(function() {
        return $rootScope.$apply(tick);
      });
    };
  }
]);

app.controller("MainCtrl", ["$scope", "Easie", "$requestAnimationFrame", function($scope, Easie, $requestAnimationFrame){

  var anim_duration = 3000;
  var start_point = 0;
  var div_max_size = 800;

  $scope.animation_functions = []
  
  for(var animation_name in Easie)
    $scope.animation_functions.push(animation_name);

  $scope.launch = function() {

    var ease_function = Easie[this.animation_name];
    var scope = this;

    if (this.width === undefined)
      this.width = 0;

    var animate = function() {

      var start = Date.now()

      var animation = function() {
        if (Date.now() - start < anim_duration)
          $requestAnimationFrame(animation);
        
        var time = Date.now() - start;

        if (time > anim_duration)
          time = anim_duration;

        scope.width = ease_function(time, start_point, div_max_size, anim_duration);

      };

      animation();

    };

    animate();
  }

}]);