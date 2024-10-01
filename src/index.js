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

  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let currentDateTime = document.querySelector("#time");
  currentDateTime.innerHTML = `${currentDay} ${hours}:${minutes}`;
}

let now = new Date();
formatDate(now);

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");

  if (searchInput.value) {
    getWeather(searchInput.value);
  } else {
    alert("please type in a city");
  }
}

function refreshWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  let headingElement = document.querySelector("#city");
  headingElement.innerHTML = `${city}`;
  let currentTemperature = document.querySelector(".current-temperature-value");
  currentTemperature.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-icon" />`;
}

function getWeather(city) {
  let apiKey = "991bbo481ffb54ef6edf4e5a0t3f0207";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", displayCity);

getWeather("Paris");
