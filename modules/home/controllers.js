'use strict';
 
var memoryGameApp = angular.module('memoryGameApp', []);

memoryGameApp.factory('game', function() {
  var tileNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];
  return new Game(tileNames);
});


memoryGameApp.controller('GameCtrl',function GameCtrl($scope, game, $timeout) {
  $scope.game = game;
  $scope.unmatchedPairs = $scope.game.unmatchedPairs;
  $scope.counter = 0;
  $scope.onTimeout = function(){
      $scope.counter++;
      $scope.unmatchedPairs = $scope.game.unmatchedPairs;
      console.log($scope.unmatchedPairs);
      mytimeout = $timeout($scope.onTimeout,1000);
      if ($scope.unmatchedPairs == 0) {
        $timeout.cancel(mytimeout);
      };
  }
  var mytimeout = $timeout($scope.onTimeout,1000);
});