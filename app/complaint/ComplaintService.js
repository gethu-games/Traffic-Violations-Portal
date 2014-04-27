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

/*
 * Updates and Retrieves Complaint data to / from the server
 * stores the complaint data
 */
trafficApp.service('ComplaintService', ['$http', function($http) {

    return {

        /**
         * registers a new complaint with server for the specified video
         * @params {Video}      vid         video object for which the complaint is given
         * @params {Complaint}  complaint   new complaint object 
         */
        addNewComplaint: function(complaint) {

            var json            =   JSON.stringify(complaint);

            $http({
                url:                'api/complaint.php',
                method:             "POST",
                data:               json,
                headers:            {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
            }).error(function (data, status, headers, config) {
            });

        },

        /**
         * retrieves all the complaints for the specified video
         * @params {Video}      vid         video object for which the complaints
         *                                  are to be retrieved
         * @params {function}   callback    callback function to invoke on retrieval of 
         *                                  complaints
         */
        getComplaints: function(vid, callback) {

            $http({ 
                url:                'api/complaint.php?videoID=' + vid.videoID,
                method:             'GET',
                headers:            {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                var rawComplaints           =   data;
                var complaintArray          =   [];

                // complaints will be received in a flat array; that need
                // to be converted into a 2-D array, categorized by
                // complaint Type
                for (var j = 0; j < rawComplaints.length; j++) {
                    var violationFound      =   false;
                    var compl               =   rawComplaints[j];

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

                callback(rawComplaints, complaintArray);

            }).error(function (data, status, headers, config) {
                callback(data);
            });

        }
    };

}]);

