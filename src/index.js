function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `Last updated: ${currentDay}, ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
         <div class="row day">
            <div class="col-2 forecast-day">${formatDay(forecastDay.dt)}</div>
            <div class="col">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" class="" width="40"/>
            </div>
            <div class="col-3 highest-temp">${Math.round(
              forecastDay.temp.max
            )}°C</div>
            <div class="col-2 lowest-temp">${Math.round(
              forecastDay.temp.min
            )}°C</div>
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let unit = "metric";
  let apiKey = "4041bf9742afc24728873441533a36de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCityTemp);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4041bf9742afc24728873441533a36de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showCityTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("#current-temperature");
  let city = document.querySelector("#current-city");
  let currentConditions = document.querySelector(".current-conditions");
  let currentIconElement = document.querySelector("#current-weather-icon");
  let weatherDescription = response.data.weather[0].description;
  let windSpeedKm = Math.round(response.data.wind.speed) * 3.6;
  currentTempElement.innerHTML = `${celsiusTemperature}°C`;
  city.innerHTML = response.data.name;
  currentConditions.innerHTML = `${weatherDescription} with a wind speed of ${windSpeedKm}km/h.`;
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function handleCityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#which-city").value;
  search(city);
}

function convertToCelsius(event) {
  event.preventDefault();
  toFahrenheit.classList.remove("active");
  toCelsius.classList.add("active");
  let temperature = document.querySelector("span.current-temperature");
  temperature.innerHTML = `${celsiusTemperature}°C`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  toCelsius.classList.remove("active");
  toFahrenheit.classList.add("active");
  let fahrenheit = Math.round(celsiusTemperature * 1.8 + 32);
  let temperature = document.querySelector("span.current-temperature");
  temperature.innerHTML = `${fahrenheit}°F`;
}

function showCurrentCityTemp(response) {
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature");
  let currentConditions = document.querySelector(".current-conditions");
  let weatherDescription = response.data.weather[0].description;
  let windSpeedKm = Math.round(response.data.wind.speed) * 3.6;
  let currentIconElement = document.querySelector("#current-weather-icon");
  celsiusTemperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentTemperature.innerHTML = `${celsiusTemperature}°C`;
  currentConditions.innerHTML = `${weatherDescription} with a wind speed of ${windSpeedKm}km/h.`;
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showCoordinates(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "4041bf9742afc24728873441533a36de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityTemp);
}

function getCoordinates(event) {
  navigator.geolocation.getCurrentPosition(showCoordinates);
}

let celsiusTemperature = null;

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = formatDate(now);

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("submit", handleCityInput);

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertToFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", convertToCelsius);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCoordinates);

search("Tokyo");
