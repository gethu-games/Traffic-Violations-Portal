var trafficApp = angular.module('TrafficApp');

trafficApp.controller('LeaderboardController', ['$scope', '$http', '$log', 'leaderboardData', function($scope, $http, $log, leaderboardData) {

    $scope.data = leaderboardData.getData();

    $scope.clicker = function(id) {
        $scope.selectedOption = leaderboardData.getSelectedData(id);
    };
    $scope.clicker(0);

}]);

