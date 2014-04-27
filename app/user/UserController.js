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

/**
 * exposes the functionalities of `UserService` through its Scope
 */
TrafficApp.controller('UserController', ['$scope', 'UserService', function($scope, userService) {

    $scope.user                 =   userService.user;

    $scope.login = function() {
        userService.login(function() {
            $scope.user         =   userService.user;
        });
    };

}]);

