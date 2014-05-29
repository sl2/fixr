var fixrApp = angular.module('fixrApp', []);

fixrApp.controller("mainCtrl", function($scope, $http) {

    // Get heroku application list
    $scope.appList = _getAppList(); 
   
    // Restart selected app
    $scope.restartApp = function(name){
        _restartApp(name);
    }

    //Inner functions
    function _getAppList() {
        $http.get('/api/applist').success(function(apps) {
            $scope.appList = apps;
        }).error(function(err){
            alert("Application list get error.");
            console.log(err);
        });
    }

    function _restartApp(name) {
        $http.get('/api/restart', {params:{app:name}}).success(function(data) {
            alert("Now Restarting " + name);
        }).error(function(err){
            alert("Restart error.");
            console.log(err);
        });
    }

});

