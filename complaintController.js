var trafficApp = angular.module('TrafficApp');

trafficApp.controller('ComplaintListController', ['$scope', '$http', '$log', 'video', function($scope, $http, $log, video) {

    // sample video data
    $scope.complaints = [];

    $scope.newComplaint = {};

    $scope.video = video;

    $scope.addNewComplaint = function() {
        var item = {};
        $log.log($scope);
        item["videoID"] = $scope.video.videoID;
        item["vehicleRegNo"] = $scope.newComplaint.vehicleRegNo;
        item["vehicleType"] = $scope.newComplaint.vehicleType;
        item["violationType"] = $scope.newComplaint.violationType;
        item["timeSlice"] = $scope.newComplaint.timeSlice;
        item["analyzedBy"] = "other one";

        $scope.complaints.push(item);

        var json = JSON.stringify(item);
        console.log(json);

        $http({
            url: 'api/complaint.php',
            method: "POST",
            data: json,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $log.log("success");
            $log.log(data);
        }).error(function (data, status, headers, config) {
            $log.log("error");
            $log.log(data);
        });
    };

}]);

