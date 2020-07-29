//SERVICES
weatherApp.service('cityService', function () {
    this.city = "Borivali";    
    

    
});

weatherApp.service('weatherService', ['$resource', function ($resource) {

    //https://openweathermap.org/current
    //http://api.openweathermap.org/data/2.5/weather?q=Borivali&units=metric&appid=2d54d0e986130ec7732ede73bf6e09d2

    //https://openweathermap.org/forecast5
    //http://api.openweathermap.org/data/2.5/forecast?q=Borivali&appid=2d54d0e986130ec7732ede73bf6e09d2

    this.getWeather = function (city) {
        var weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast",
            { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

        return weatherApi.get({
            q: city,
            units: "metric",
            appid: "2d54d0e986130ec7732ede73bf6e09d2"
        });
    }
}]);