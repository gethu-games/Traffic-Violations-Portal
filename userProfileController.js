var TrafficApp = angular.module('TrafficApp');

trafficApp.controller('UserProfileController', function($scope, $http, $log) {

    $scope.user = {};
    $scope.user.name ="";

    $scope.login = function() {
        $scope.oAuthLogin();
    }

    $scope.loginToServer = function(name, email) {
        $http({
            url: 'api/user.php',
            method: "POST",
            data: {'name': name, 'email': email},
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $log.log(data);
        }).error(function (data, status, headers, config) {
            $log.log(data);
        });
    }

    $scope.oAuthLogin = function() {

        OAuth.popup('google', function(err, result) {
            //$log.log(result);
            result.get('/oauth2/v1/userinfo').done(function(data) {
                $scope.user     =   data; 
                $log.log(data);
                //$log.log(data.email);
                $scope.mail     =   data.email; 
                $scope.loginToServer(data.name, data.email);
            });
        });

    }
});

