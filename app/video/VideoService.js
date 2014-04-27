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

trafficApp.service('VideoService', ['$http',
                                    '$log',
                                    'ComplaintService',
                                    function($http,
                                             $log,
                                             complaintService) {


    return {
        /**
         * returns the list of all complaints registered in the system
         */
        complaintType : ["Red Signal Jump",
                         "Line Crossing",
                         "No Helmet"],

        /**
         * returns list of all videos received from the server
         * this is a async function
         * @params {function}   callback        function to invoke once the data is received
         */
        getVideos : function(callback) {

            // get all videos
            $http({ method: 'GET', url: 'api/video.php' }).
            success(function (data, status, headers, config) {

                callback(data);

                // for each video, get the complaints
                for (var i = 0; i < data.length; i++) {
                    var vid     =   data[i];
                    complaintService.getComplaints(vid, function(cdata) {
                        var complaintArray          =   [];

                        // complaints will be received in a flat array; that need
                        // to be converted into a 2-D array, categorized by
                        // complaint Type
                        for (var j = 0; j < cdata.length; j++) {
                            var violationFound      =   false;
                            var compl               =   cdata[j];

                            // see if the complaint type is already registered
                            for (var k = 0; k < complaintArray.length; k++) {
                                if (complaintArray[k].violationType === compl.violationType) {
                                    violationFound  =   true;
                                    complaintArray[k]['violations'].push({'vehicleRegNo': compl.vehicleRegNo, 
                                                                          'vehicleType': compl.vehicleType,
                                                                          'timeSlice': compl.timeSlice});
                                    break;
                                }
                            }
                            if (violationFound == false) {
                                var newType         =   {};
                                newType['violationType']        =   compl.violationType;
                                newType['violations']           =   [];
                                newType['violations'].push({'vehicleRegNo': compl.vehicleRegNo, 
                                                            'vehicleType': compl.vehicleType,
                                                            'timeSlice': compl.timeSlice});
                                complaintArray.push(newType);
                            }
                        }

                        vid.complaints              =   complaintArray;
                        vid.rawComplaints           =   cdata;
                    });
                }
            }).
            error(function (data, status, headers, config) {
                callback([]);
            });

        },
        // end of getVideos

        addNewVideo: function(vid, callback) {

            $log.log(vid);
            var json            =   JSON.stringify(vid);

            $http({
                url:                'api/video.php',
                method:             "POST",
                data:               json,
                headers:            {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                $log.log("success");
                $log.log(data);
                callback(data.videoID);
            }).error(function (data, status, headers, config) {
            });

        }

    };


}]);

