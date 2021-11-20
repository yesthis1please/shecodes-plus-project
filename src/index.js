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

function search(city) {
  let unit = "metric";
  let apiKey = "4041bf9742afc24728873441533a36de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCityTemp);
}

function showCityTemp(response) {
  let city = document.querySelector("#current-city");
  celsiusTemperature = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("#current-temperature");
  currentTempElement.innerHTML = `${celsiusTemperature}°C`;
  city.innerHTML = response.data.name;
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
  celsiusTemperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentTemperature.innerHTML = `${celsiusTemperature}°C`;
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
