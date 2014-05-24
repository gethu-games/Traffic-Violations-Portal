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
                                    'YoutubeService',
                                    '$rootScope',
                                    function($http,
                                             $log,
                                             complaintService,
                                             youtubeService,
                                             $rootScope) {


    return {

        complaint: complaintService,

        /** object that holds the new Video Object */
        newVid : {},

        /**
         * returns list of all videos received from the server
         * this is a async function
         * @params {function}   callback        function to invoke once the data is received
         */
        getVideos : function(callback) {

            var self            =   this;

            // get all videos
            $http({ method: 'GET', url: 'api/video.php' }).
            success(function (data, status, headers, config) {

                //$log.log(data);

                callback(data);

                // for each video, get the complaints
                for (var i = 0; i < data.length; i++) {
                    var vid     =   data[i];
                    vid.thumbURL=   youtubeService.getThumbURL(vid.videoURL);
                    self.getComplaints(vid);
                }
            }).
            error(function (data, status, headers, config) {
                callback([]);
            });

        },
        // end of getVideos

        /**
         * get the complaints for the specified video from server
         */
        getComplaints: function(vid) {
            vid.complaints                  =   [];
            vid.rawComplaints               =   [];

            complaintService.getComplaints(vid, function(rawComplaints, complaintArray) {
                vid.rawComplaints           =   rawComplaints;
                vid.complaints              =   complaintArray;

            });
        },

        /**
         * calls Video service and send new video data to server
         * If video is successfully added, notifies the
         * controller by broadcasting the message `videoAdded`
         * @params {video}  vid     New Video Object
         */
        addNewVideo: function(vid) {

            //$log.log(vid);
            var json            =   JSON.stringify(vid);
            this.newVid         =   vid;

            $http({
                url:                'api/video.php',
                method:             "POST",
                data:               json,
                headers:            {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                vid['videoID']  =   data.videoID;
                $rootScope.$broadcast('videoAdded');
                //console.log(data);
            }).error(function (data, status, headers, config) {
                //console.log(data);
            });

        }



    };


}]);

