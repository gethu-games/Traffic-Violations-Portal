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

var trafficApp = angular.module('TrafficApp');

trafficApp.controller('ComplaintController', ['$scope',
                                              'ComplaintService',
                                              'UserService',
                                              'video',
                                              function($scope,
                                                       complaintService,
                                                       userService,
                                                       video) {

    /**
     * reference to Complaint Service
     */
    $scope.complaint            =   complaintService;

    /**
     * current video for which analyze phase is being done
     */
    $scope.video                =   video;

    /**
     * array that will hold the list of complaints for the given video
     */
    $scope.rawComplaints        =   video.rawComplaints;

    /**
     * single complaint details that is last entered to be send to web service
     * model linked with the form in popup analyze dialog
     */
    $scope.newComplaint         =   {};

    /**
     * will be called from the Analyze popup dialog
     */
    $scope.addNewComplaint      =   function() {
        var item                =   {};
        item["videoID"]         =   $scope.video.videoID;
        item["vehicleRegNo"]    =   $scope.newComplaint.vehicleRegNo;
        item["vehicleType"]     =   $scope.newComplaint.vehicleType;
        item["violationType"]   =   $scope.newComplaint.violationType;
        item["timeSlice"]       =   $scope.newComplaint.timeSlice;
        item["analyzedBy"]      =   userService.user.email;

        complaintService.processComplaintToArray(item, $scope.video.complaints);
        complaintService.addNewComplaint(item);
        $scope.video.rawComplaints.push(item);
    };

}]);

