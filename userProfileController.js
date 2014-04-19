var TrafficApp = angular.module('TrafficApp');

trafficApp.controller('UserProfileController', function($scope, $http, $log) {

    $scope.loginToServer = function(mail) {

        $http({ method: 'POST', url: 'api/user.php' }).
            success(function (data, status, headers, config) {
                //$log.log("success");
                //$log.log(data);
            }).
            error(function (data, status, headers, config) {
                $log.log("error");
            });


    }

    $scope.oAuthLogin = function() {

        OAuth.popup('google', function(err, result) {
            //$log.log(result);
            result.get('/oauth2/v1/userinfo').done(function(data) {
                //$log.log("google login");
                $log.log(data);
                $log.log(data.email);
                $scope.mail     =   data.email; 
                $scope.loginToServer(data.email);
            });
        });

    }
});

