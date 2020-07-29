// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
}]);


weatherApp.controller('forecastController',
    ['$scope', 'cityService', 'weatherService',
        function ($scope, cityService, weatherService) {

            $scope.city = cityService.city;
            $scope.weatherResult = weatherService.getWeather($scope.city);

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
            //console.log($scope.weatherResult);
        }]);