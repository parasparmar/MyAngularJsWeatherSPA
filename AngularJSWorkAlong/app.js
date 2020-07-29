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
    $scope.units = cityService.units;
    $scope.apiKey = cityService.apiKey;

    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast",
        { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

    $scope.weatherResult = $scope.weatherApi.get({
        q: $scope.city,
        units: $scope.units,
        appid: $scope.apiKey
    });
    // Convert F to C.
    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    $scope.convertToCelsius = function (degK) {
        // debugger;
        return Math.round(degK - 273.15);
    }
    $scope.getWeatherIconUrl = function (iconcode) {
        
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        return iconurl;
    }

    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    }
    console.log($scope.weatherResult);
}]);