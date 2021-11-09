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

  return `${currentDay}, ${currentHour}:${currentMinute}`;
}

function showTemp(response) {
  let currentTempElement = document.querySelector("#current-temperature");
  let currentTemp = Math.round(response.data.main.temp);
  currentTempElement.innerHTML = `${currentTemp}°C`;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#which-city");
  let city = document.querySelector("#current-city");

  let unit = "metric";
  let apiKey = "4041bf9742afc24728873441533a36de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  city.innerHTML = cityInput.value;

  axios.get(apiUrl).then(showTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsius = 26;
  let temperature = document.querySelector("span.current-temperature");
  temperature.innerHTML = `${celsius}°C`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let celsius = 26;
  let fahrenheit = Math.round(celsius * 1.8 + 32);
  let temperature = document.querySelector("span.current-temperature");
  temperature.innerHTML = `${fahrenheit}°F`;
}

function showCurrentCity(response) {
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentTemperature.innerHTML = `${temperature}°C`;
}

function showCoordinates(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "4041bf9742afc24728873441533a36de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCity);
}

function getCoordinates(event) {
  navigator.geolocation.getCurrentPosition(showCoordinates);
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = formatDate(now);

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("submit", showCity);

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertToFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", convertToCelsius);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCoordinates);
