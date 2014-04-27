var trafficApp = angular.module('TrafficApp');

trafficApp.service('leaderboardData', function() {

    var topIndividuals = {};

    topIndividuals['weekly'] =  [
        {"name": "Bhagath Singh", "point": 120},
        {"name": "Mahatma Gandhi", "point": 96},
        {"name": "Subash", "point": 92},
        {"name": "Bharathiyaar", "point": 86},
        {"name": "V. O. C", "point": 80},
        {"name": "Lajpat Rai", "point": 70},
        {"name": "Periyaar", "point": 65},
        {"name": "Nehru", "point": 60},
        {"name": "Sukhdev", "point": 55},
        {"name": "Tilak", "point": 50}
    ];

    topIndividuals['monthly'] = [
        {"name": "Mahatma Gandhi", "point": 600},
        {"name": "Subash", "point": 520},
        {"name": "Bhagath Singh", "point": 500},
        {"name": "Bharathiyaar", "point": 486},
        {"name": "V. O. C", "point": 400},
        {"name": "Lajpat Rai", "point": 350},
        {"name": "Periyaar", "point": 320},
        {"name": "Nehru", "point": 310},
        {"name": "Sukhdev", "point": 290},
        {"name": "Tilak", "point": 250}
    ];

    topIndividuals['yearly'] = [ 
        {"name": "Subash", "point": 9000},
        {"name": "Mahatma Gandhi", "point": 8800},
        {"name": "Bhagath Singh", "point": 8600},
        {"name": "Bharathiyaar", "point": 8100},
        {"name": "V. O. C", "point": 7900},
        {"name": "Lajpat Rai", "point": 6700},
        {"name": "Periyaar", "point": 6200},
        {"name": "Nehru", "point": 5750},
        {"name": "Sukhdev", "point": 5500},
        {"name": "Tilak", "point": 5200}
    ];


    var topRegion = {};

    topRegion['weekly'] =  [
        {"name": "Chennai", "point": 120},
        {"name": "Porpandhar", "point": 96},
        {"name": "Delhi", "point": 92},
        {"name": "Madurai", "point": 86},
        {"name": "Trichy", "point": 80},
        {"name": "Mumbai", "point": 70},
        {"name": "Salem", "point": 65},
        {"name": "Amrister", "point": 60},
        {"name": "Lucknow", "point": 55},
        {"name": "Pune", "point": 50}
    ];

    topRegion['monthly'] = [
        {"name": "Porpandhar", "point": 600},
        {"name": "Delhi", "point": 520},
        {"name": "Chennai", "point": 500},
        {"name": "Madurai", "point": 486},
        {"name": "Trichy", "point": 400},
        {"name": "Mumbai", "point": 350},
        {"name": "Salem", "point": 320},
        {"name": "Amrister", "point": 310},
        {"name": "Lucknow", "point": 290},
        {"name": "Pune", "point": 250}
    ];

    topRegion['yearly'] = [ 
        {"name": "Delhi", "point": 9000},
        {"name": "Porpandhar", "point": 8800},
        {"name": "Chennai", "point": 8600},
        {"name": "Madurai", "point": 8100},
        {"name": "Trichy", "point": 7900},
        {"name": "Mumbai", "point": 6700},
        {"name": "Salem", "point": 6200},
        {"name": "Amrister", "point": 5750},
        {"name": "Lucknow", "point": 5500},
        {"name": "Pune", "point": 5200}
    ];


    var topOrganization = {};

    topOrganization['weekly'] =  [
        {"name": "Thozhan", "point": 120},
        {"name": "Infosys", "point": 96},
        {"name": "CSS", "point": 92},
        {"name": "CCTP", "point": 86},
        {"name": "GFoI", "point": 80},
        {"name": "CTS", "point": 70},
        {"name": "5th Pillar", "point": 65},
        {"name": "Anna Univ", "point": 60},
        {"name": "MNMJEC", "point": 55},
        {"name": "IIT, Madras", "point": 50}
    ];

    topOrganization['monthly'] = [
        {"name": "Infosys", "point": 600},
        {"name": "CSS", "point": 520},
        {"name": "Thozhan", "point": 500},
        {"name": "CCTP", "point": 486},
        {"name": "GFoI", "point": 400},
        {"name": "CTS", "point": 350},
        {"name": "5th Pillar", "point": 320},
        {"name": "Anna Univ", "point": 310},
        {"name": "MNMJEC", "point": 290},
        {"name": "IIT, Madras", "point": 250}
    ];

    topOrganization['yearly'] = [ 
        {"name": "CSS", "point": 9000},
        {"name": "Infosys", "point": 8800},
        {"name": "Thozhan", "point": 8600},
        {"name": "CCTP", "point": 8100},
        {"name": "GFoI", "point": 7900},
        {"name": "CTS", "point": 6700},
        {"name": "5th Pillar", "point": 6200},
        {"name": "Anna Univ", "point": 5750},
        {"name": "MNMJEC", "point": 5500},
        {"name": "IIT, Madras", "point": 5200}
    ];


    var data = [ {
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

    return {
        getData: function() {
            return data;
        },
        getSelectedData: function(id) {
            for (var i = 0; i < data.length; i++) {
                if (id == data[i].id) {
                    return data[i].values;
                }
            }
        }
    }

});
