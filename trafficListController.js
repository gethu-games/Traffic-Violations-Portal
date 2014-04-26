var trafficApp = angular.module('TrafficApp');

trafficApp.controller('TrafficListController', ['$scope', '$http', '$log', 'createDialog', 'complaintService', function($scope, $http, $log, createDialogService, complaintService) {

    // sample video data
    $scope.videos = [{
        videoID: 125461,
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

    $scope.complaintType = ["Red Signal Jump",
                            "Line Crossing",
                            "No Helmet"];

    $scope.newVid = {};

    $http({ method: 'GET', url: 'api/video.php' }).
    success(function (data, status, headers, config) {
        //$log.log("success");
        $scope.videos = data;

        for (var i = 0; i < data.length; i++) {
            var vid = data[i];
            complaintService.getComplaints(vid, function(cdata) {
                var complaintArray = [];
                for (var j = 0; j < cdata.length; j++) {
                    var violationFound = false;
                    var compl = cdata[j];
                    //console.log(compl);
                    for (var k = 0; k < complaintArray.length; k++) {
                        if (complaintArray[k].violationType === compl.violationType) {
                            violationFound = true;
                            complaintArray[k]['violations'].push({'vehicleRegNo': compl.vehicleRegNo, 
                                                                    'vehicleType': compl.vehicleType,
                                                                    'timeSlice': compl.timeSlice});
                            break;
                        }
                    }
                    if (violationFound == false) {
                        var newType = {};
                        newType['violationType'] = compl.violationType;
                        newType['violations'] = [];
                        newType['violations'].push({'vehicleRegNo': compl.vehicleRegNo, 
                                                    'vehicleType': compl.vehicleType,
                                                    'timeSlice': compl.timeSlice});
                        complaintArray.push(newType);
                    }
                }

                //$scope.$apply(function() {
                    vid.complaints = complaintArray;
                //});

                console.log($scope.videos);
            });
        }
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
            vid['videoID'] = data.videoID;
            $log.log(data);
        }).error(function (data, status, headers, config) {
            $log.log("error");
            $log.log(data);
        });
    };

}]);

