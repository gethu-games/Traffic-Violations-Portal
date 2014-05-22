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

trafficApp.service('YoutubeService', ['$log', '$http', function($log, $http) {


    return {
        /**
         * Forms the thumbnail URL for the given youtube video
         * Logic: http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
         */
        getThumbURL : function(videoURL) {
            var vid             =   this.getVideoID(videoURL);
            var url             =   'http://img.youtube.com/vi/' + vid + '/2.jpg';
            console.log(url);
            return                  url;

        },

        /**
         * extracts the Unique video ID from the give youtube video URL
         */
        getVideoID: function(videoURL) {
            var regExp          =   /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match           =   videoURL.match(regExp);
            if (match&&match[7].length==11) {
                return              match[7];
            } else {
                return              null;
            }
            /*
            regex               =   /https\:\/\/www\.youtube\.com\/watch\?v=(\w{11})/;
            url                 =   videoURL;
            id                  =   url.match(regex)[1];
            return                  id;
            */
        },

        getVideoDuration: function(videoID, callback) {
            var videoMetaURL    =   'http://gdata.youtube.com/feeds/api/videos/' + videoID + '?v=2&alt=jsonc';
            $http({
                url:                videoMetaURL,
                method:             'GET',
                headers:            {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                callback(data.data.duration);
            }).error(function (data, status, headers, config) {
                callback(data);
            });
        }

    };


}]);

