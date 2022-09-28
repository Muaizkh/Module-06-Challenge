var apiKey = "7fac45009c803a75ab838aacfa0a79b6";
var searchButton = $("#search-button");
// search button to get it to work
var searchHistoryListEl = $("#search-history");
// serach history list
// to keep track of cities searched

function getWeather(lat, lon, type, units, appid) {
    var apiKey = "7fac45009c803a75ab838aacfa0a79b6";
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={7fac45009c803a75ab838aacfa0a79b6}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // varaibles that will be used in both of the API fetches as it is neccesarry to get the information that is required and will help better explain the weather 
            var humidity;
            var windSpeed 
            var weather;

            // I know need to process the data and make sure to run an if statment to allow for the forecast to actually be read by the HTML and for the api call to work
            if (type === "forecast") { // API end point for 120 hours of weather split into 3 hour segments
                var weekdayForecastEl = $("#weekday-forcast"); // Container element
                weekDayForecastEl.html(""); // Reset the forecast container
                var dailyWeather = [];
                var currentDay = [];
            //    data being spereated into days as it is needed to show the forecast for the week
                data.list.forEach((e) => { 
                    if (currentDay.length === 0) {
                        currentDay.push(e);
                    } else {
                       
                        if (currentDay[currentDay.length - 1].dt_txt.split(" ")[0] !== e.dt_txt.split(" ")[0]) {
                            dailyWeather.push(currentDay); 
                            currentDay = [e]; 
                        } else { 
                            currentDay.push(e);
                        }
                    }
                });
                if (currentDay.length !== 0) dailyWeather.push(currentDay); 
                if (dailyWeather.length > 5) dailyWeather.shift(); 

                dailyWeather.forEach((e) => {
                   

                    weatherDate = new Date(e[0].dt * 1000).toJSON().split("T")[0]; 
                    if (e[5]) { 
                        weatherIcon = e[5].weather[0].icon;

                        weather = e[5].weather[0].description;
                        windSpeed = e[5].wind.speed;
                        humidity = e[5].main.humidity;
                    } else { // Otherwise, use the icon for midnight
                        weatherIcon = e[0].weather[0].icon;

                        weather = e[0].weather[0].description;
                        windSpeed = e[0].wind.speed;
                        humidity = e[0].main.humidity;
                    }
                    var temperatureRangeData = getMaxMinTemperature(e); 
                    temperatureRange = `Low ${temperatureRangeData.low}°C / High ${temperatureRangeData.high}°C`;

                });

            } else if (type === "weather") {
                var todaysForecastEl = $("#todays-forecast"); 
                todaysForecastEl.html(""); 
                var currentTemp = Math.round(data.main.temp);
                var cityName = data.name;
                weatherDate = new Date(data.dt * 1000).toJSON().split("T")[0]; 
                weather = data.weather[0].description;
                weatherIcon = data.weather[0].icon;
                windSpeed = data.wind.speed;
                humidity = data.main.humidity;
                temperatureRange = `Low ${Math.round(data.main.temp_min)}°C / High ${Math.round(data.main.temp_max)}°C`;

        
               
            }
        });
}

