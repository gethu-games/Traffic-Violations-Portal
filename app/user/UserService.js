/*
TRAFFIC VIOLATIONS PORTAL
saiy2k (http://saiy2k.blogspot.in)

This file is part of Traffic Violation Portal project (https://github.com/GethuGames/Traffic-Violations-Portal).

Traffic-Violations-Portal is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Traffic-Violations-Portal is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with ACR-Timeline-Infograph. If not, see <http://www.gnu.org/licenses/>.
*/

var TrafficApp = angular.module('TrafficApp');

/*
 * Stores User Profile, Login State, etc.,
 * Login User via oauth.js, configured with Google Login for now
 */
TrafficApp.service('UserService', ['$http', '$log', '$rootScope', function($http, $log, $rootScope) {

    return {

        /** object to store all user data */
        user: {
            'name': ''
        },

        /**
         * login User via oAuth.js to get User ID
         * @params {function}   callback    callback function to invoke once logged in
         */
        login: function(callback) {

            var self            =   this;

            OAuth.popup('google', function(err, result) {
                $log.log(result);
                $log.log(err);
                result.get('/oauth2/v1/userinfo').done(function(data) {
                    $log.log(data);
                    self.user   =   data; 
                    self.loginToServer(data.name, data.email, callback);
                });
            });

        },

        /**
         * login to our own server. For now, its just to make note of
         * new users;
         * TODO: but later this service will return access token, that 
         *  will be used for any further requests like uploading video,
         *  registering violations, etc.,
         * @params {string}     name        name of the user
         * @params {string}     email       email of the user (unique field)
         * @params {function}   callback    callback function to invoke once logged in
         */
        loginToServer: function(name, email, callback) {

            $http({
                url: 'api/user.php',
                method: "POST",
                data: {'method': 'login', 'name': name, 'email': email},
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                callback(data);
                $rootScope.$broadcast('user:updated');
            }).error(function (data, status, headers, config) {
                callback(data);
            });

        },

        awardPoint: function(email, point, callback) {

            $http({
                url: 'api/user.php',
                method: "POST",
                data: {'method': 'awardPoint', 'points': point, 'email': email},
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                callback(data);
                $rootScope.$broadcast('user:updated');
            }).error(function (data, status, headers, config) {
                callback(data);
            });

        }

    };

}]);

