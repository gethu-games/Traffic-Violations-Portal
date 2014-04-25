var trafficApp = angular.module('TrafficApp');

trafficApp.controller('TrafficListController', ['$scope', '$http', '$log', 'createDialog', function($scope, $http, $log, createDialogService) {

    // sample video data
    $scope.videos = [{
        videoId: 125461,
        videoURL: 'http://www.youtube.com/dfiJKLs23j',
        thumbURL: 'http://gfoi.com/traffic/saiy2k/yy-mm-dd-hh-mm.jpg',
        uploadedBy: 'saiy2k',
        analyzedBy: 'saiy3k',
        locality: 'Kalaignar Arch',
        town: 'Saidapet',
        city: 'Chennai',
        pincode: 600015,
        time: 'yyyy-mm-dd-hh-mm',
        officerInCharge: 'Mr. Sathappan',
        complaints: [{ 
        }]
    }];

    $scope.newVid = {};

    $http({ method: 'GET', url: 'api/video.php' }).
    success(function (data, status, headers, config) {
        //$log.log("success");
        //$log.log(data);
        $scope.videos = data;
    }).
    error(function (data, status, headers, config) {
        $log.log("error");
        $log.log(data);
        $scope.videos = [];
    });

    $scope.upload = function() {
        createDialogService('simpleModal.html', {
          id: 'simpleDialog',
          title: 'Upload Video to save India',
          backdrop: true,
          controller: 'TrafficListController',
          success: {label: 'Success', fn: function() {console.log('Simple modal closed');}}
        });
    };

    $scope.analyze = function(vid) {
        createDialogService('analyzeModal.html', {
          id: 'analyzeDialog',
          title: 'Analyze Video',
          backdrop: true,
          controller: 'ComplaintListController',
          success: {label: 'Success', fn: function() {console.log('Simple modal closed');}}
        }, {
            video: vid
        });
    };

    $scope.addNewVideo = function() {
        var vid = {};
        $log.log($scope);
        vid["videoURL"] = $scope.newVid.videoURL;
        vid["thumbURL"] = $scope.newVid.videoURL;
        vid["uploadedBy"] = "someone";
        vid["analyzedBy"] = "";
        vid["locality"] = $scope.newVid.locality;
        vid["town"] = $scope.newVid.town;
        vid["city"] = $scope.newVid.city;
        vid["pincode"] = $scope.newVid.pincode;
        vid["time"] = $scope.newVid.time;

        var json = JSON.stringify(vid);

        $http({
            url: 'api/video.php',
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

