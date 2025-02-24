function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "b0o0t6f043b716862abbd32513768230";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function getForecast(city) {
    let apiKey = "b0o0t6f043b716862abbd32513768230";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHTML = "";

    days.forEach(function(day) {
        forecastHTML += `
        <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌤</div>
            <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature"><strong>15°</strong></div>
                <div class="weather-forecast-temperature">9°</div>
            </div>
        </div>`;
    });

    forecastElement.innerHTML = forecastHTML;
}

document.querySelector("#search-form").addEventListener("submit", handleSearchSubmit);
searchCity("New York");
