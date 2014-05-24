var trafficApp = angular.module('TrafficApp');

trafficApp.service('leaderboardData', ['$http', '$log', function($http, $log) {

    var topIndividuals = {};

    topIndividuals['weekly'] =  [
        {"userName": "Bhagath Singh", "points": 120},
        {"userName": "Mahatma Gandhi", "points": 96},
        {"userName": "Subash", "points": 92},
        {"userName": "Bharathiyaar", "points": 86},
        {"userName": "V. O. C", "points": 80},
        {"userName": "Lajpat Rai", "points": 70},
        {"userName": "Periyaar", "points": 65},
        {"userName": "Nehru", "points": 60},
        {"userName": "Sukhdev", "points": 55},
        {"userName": "Tilak", "points": 50}
    ];

    topIndividuals['monthly'] = [
        {"userName": "Mahatma Gandhi", "points": 600},
        {"userName": "Subash", "points": 520},
        {"userName": "Bhagath Singh", "points": 500},
        {"userName": "Bharathiyaar", "points": 486},
        {"userName": "V. O. C", "points": 400},
        {"userName": "Lajpat Rai", "points": 350},
        {"userName": "Periyaar", "points": 320},
        {"userName": "Nehru", "points": 310},
        {"userName": "Sukhdev", "points": 290},
        {"userName": "Tilak", "points": 250}
    ];

    topIndividuals['yearly'] = [ 
        {"userName": "Subash", "points": 9000},
        {"userName": "Mahatma Gandhi", "points": 8800},
        {"userName": "Bhagath Singh", "points": 8600},
        {"userName": "Bharathiyaar", "points": 8100},
        {"userName": "V. O. C", "points": 7900},
        {"userName": "Lajpat Rai", "points": 6700},
        {"userName": "Periyaar", "points": 6200},
        {"userName": "Nehru", "points": 5750},
        {"userName": "Sukhdev", "points": 5500},
        {"userName": "Tilak", "points": 5200}
    ];


    var topRegion = {};

    topRegion['weekly'] =  [
        {"userName": "Chennai", "points": 120},
        {"userName": "Porpandhar", "points": 96},
        {"userName": "Delhi", "points": 92},
        {"userName": "Madurai", "points": 86},
        {"userName": "Trichy", "points": 80},
        {"userName": "Mumbai", "points": 70},
        {"userName": "Salem", "points": 65},
        {"userName": "Amrister", "points": 60},
        {"userName": "Lucknow", "points": 55},
        {"userName": "Pune", "points": 50}
    ];

    topRegion['monthly'] = [
        {"userName": "Porpandhar", "points": 600},
        {"userName": "Delhi", "points": 520},
        {"userName": "Chennai", "points": 500},
        {"userName": "Madurai", "points": 486},
        {"userName": "Trichy", "points": 400},
        {"userName": "Mumbai", "points": 350},
        {"userName": "Salem", "points": 320},
        {"userName": "Amrister", "points": 310},
        {"userName": "Lucknow", "points": 290},
        {"userName": "Pune", "points": 250}
    ];

    topRegion['yearly'] = [ 
        {"userName": "Delhi", "points": 9000},
        {"userName": "Porpandhar", "points": 8800},
        {"userName": "Chennai", "points": 8600},
        {"userName": "Madurai", "points": 8100},
        {"userName": "Trichy", "points": 7900},
        {"userName": "Mumbai", "points": 6700},
        {"userName": "Salem", "points": 6200},
        {"userName": "Amrister", "points": 5750},
        {"userName": "Lucknow", "points": 5500},
        {"userName": "Pune", "points": 5200}
    ];


    var topOrganization = {};

    topOrganization['weekly'] =  [
        {"userName": "Thozhan", "points": 120},
        {"userName": "Infosys", "points": 96},
        {"userName": "CSS", "points": 92},
        {"userName": "CCTP", "points": 86},
        {"userName": "GFoI", "points": 80},
        {"userName": "CTS", "points": 70},
        {"userName": "5th Pillar", "points": 65},
        {"userName": "Anna Univ", "points": 60},
        {"userName": "MNMJEC", "points": 55},
        {"userName": "IIT, Madras", "points": 50}
    ];

    topOrganization['monthly'] = [
        {"userName": "Infosys", "points": 600},
        {"userName": "CSS", "points": 520},
        {"userName": "Thozhan", "points": 500},
        {"userName": "CCTP", "points": 486},
        {"userName": "GFoI", "points": 400},
        {"userName": "CTS", "points": 350},
        {"userName": "5th Pillar", "points": 320},
        {"userName": "Anna Univ", "points": 310},
        {"userName": "MNMJEC", "points": 290},
        {"userName": "IIT, Madras", "points": 250}
    ];

    topOrganization['yearly'] = [ 
        {"userName": "CSS", "points": 9000},
        {"userName": "Infosys", "points": 8800},
        {"userName": "Thozhan", "points": 8600},
        {"userName": "CCTP", "points": 8100},
        {"userName": "GFoI", "points": 7900},
        {"userName": "CTS", "points": 6700},
        {"userName": "5th Pillar", "points": 6200},
        {"userName": "Anna Univ", "points": 5750},
        {"userName": "MNMJEC", "points": 5500},
        {"userName": "IIT, Madras", "points": 5200}
    ];

    return {

        data: [],

        getData: function() {

            var self = this;
         
            self.data = [ {
                "id": 0,
                "name": "individuals",
                "values": topIndividuals
            }, {
                "id": 1,
                "name": "regions",
                "values": topRegion
            }, {
                "id": 2,
                "name": "organization",
                "values": topOrganization
            }];

            self.getUserData();
            return self.data;
        },

        getSelectedData: function(id) {
            var self = this;
            for (var i = 0; i < self.data.length; i++) {
                if (id == self.data[i].id) {
                    return self.data[i].values;
                }
            }
        },

        getUserData: function() {
            var self = this;
            // get all videos
            $http({ method: 'GET', url: 'api/user.php' }).
            success(function (data, status, headers, config) {
                self.data[0].values.weekly = data;
                self.data[0].values.monthly = data;
                self.data[0].values.yearly = data;
            }).
            error(function (data, status, headers, config) {
            });
        }
    }

}]);
