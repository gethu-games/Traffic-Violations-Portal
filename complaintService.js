var trafficApp = angular.module('TrafficApp');

trafficApp.service('complaintService', ['$http', function($http) {
    return {
        getComplaints: function(vid, callback) {
            $http({ 
                url: 'api/complaint.php?videoID=' + vid.videoID,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                callback(data);
            }).error(function (data, status, headers, config) {
                callback(data);
            });
        }
    };
}]);

