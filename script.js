const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("wind-speed");
const weatherDescription = document.getElementById("weather-description");

async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  cityName.textContent = `Weather in ${data.name}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  windSpeed.textContent = data.wind.speed;
  weatherDescription.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.style.display = "block";
}


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = "";
  } else {
    alert("Please enter a city name");
  }
});


getWeather("Harare");
