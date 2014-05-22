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
         * Vehicle Type
         */
        vehicleType : ["MTC bus",
                        "Bus",
                        "Share Autos",
                        "Auto",
                        "Bike",
                        "Car",
                        "Lorry",
                        "Truck",
                        "Garbage truck",
                        "Ambulance",
                        "Van",
                        "Tempo",
                        "Jeep",
                        "Taxi",
                        "College Bus",
                        "Office bus"],

        /**
         * returns the list of all complaints registered in the system
         */
        type : ["Jumping Signal [driving at red light]",
                "Crossing Stopline / Pedestrian Crossing",
                "Driving without Helmet",
                "Using Mobile Phones while driving",
                "Driving-on Footpath",
                "Number Plate Offences",
                "Charging Excess Fare",
                "Refusal to ply for Hire",
                "Parking violations",
                "Moving against One-Way",
                "Improper use 0f Headlights",
                "Hom offences",
                "Misbehavior with Passenger",
                "Overtaking dangerously",
                "Driving at a speed exceeding as mentioned in MVA:12",
                "Dangerous Lane cutting",
                "Dangerous DI Reckless Driving ",
                "Accidental Offences",
                "Illegal racing on road",
                "Using vehicle in Unsafe conditions",
                "Breach of rules regarding carriage hazardous goods",
                "Using Loudspeaker beyond speçified limit",
                "Not carrying valid license while driving",
                "Not carrying documents as required",
                "Carriage of goods which are hazardous to human",
                "Breach of order, refusal to give information",
                "Driving without Registration and valid permit",
                "Allowing the vehicle to be driven by a person who does not posses a valid licence",
                "Driving without valid Fitness Certificate",
                "Driving without valid licence",
                "Using Private vehicle for Commercial purpose",
                "Offences related to driving license",
                "Breach of Permit conditions",
                "Lack of proper maintenance and structure of vehicle",
                "Overloadîng a vehicle beyond extent limit",
                "Driving Without Insurance",
                "Driving of vehicle without legal authority",
                "Driving under influence of Drugs or Alcohols"],

        points:[10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            40,
            10,
            100,
            50,
            50,
            25,
            10,
            100,
            10,
            10,
            300,
            50,
            500,
            100,
            500,
            50,
            500,
            50,
            500,
            100,
            200,
            100,
            50,
            100],

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

            var self            =   this;

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
                    var compl               =   rawComplaints[j];

                    self.processComplaintToArray(compl, complaintArray);

                }

                callback(rawComplaints, complaintArray);

            }).error(function (data, status, headers, config) {
                callback(data);
            });

        },

        processComplaintToArray: function(compl, complaintArray) {
            var violationFound  =   false;

            // see if the complaint type is already registered
            for (var k = 0; k < complaintArray.length; k++) {
                if (complaintArray[k].violationType === compl.violationType) {
                    violationFound          =   true;
                    complaintArray[k]['violations'].push({'vehicleRegNo': compl.vehicleRegNo, 
                                                          'vehicleType': compl.vehicleType,
                                                          'timeSlice': compl.timeSlice});
                    break;
                }
            }
            if (violationFound == false) {
                var newType                 =   {};
                newType['violationType']    =   compl.violationType;
                newType['violations']       =   [];
                newType['violations'].push({'vehicleRegNo': compl.vehicleRegNo, 
                                            'vehicleType': compl.vehicleType,
                                            'timeSlice': compl.timeSlice});
                complaintArray.push(newType);
            }
        }
    };

}]);

