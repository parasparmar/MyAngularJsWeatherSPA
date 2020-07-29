// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
});

//SERVICES
weatherApp.service('cityService', function () {
    this.city = "Mumbai, Maharashtra";
    this.apiKey = "2d54d0e986130ec7732ede73bf6e09d2"; //2d54d0e986130ec7732ede73bf6e09d2
    this.units = "metric";

    //https://openweathermap.org/current
    //http://api.openweathermap.org/data/2.5/weather?q=Borivali&units=metric&appid=2d54d0e986130ec7732ede73bf6e09d2

    //https://openweathermap.org/forecast5
    //http://api.openweathermap.org/data/2.5/forecast?q=Borivali&appid=2d54d0e986130ec7732ede73bf6e09d2
});

// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {
    $scope.city = cityService.city;
    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast",
        { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });
    $scope.weatherResult = $scope.weatherApi.get({
        q: $scope.city,        
        units: $scope.units,
        appid: $scope.apiKey
    });

    console.log($scope.weatherResult);
}]);