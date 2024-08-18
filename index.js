// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY';

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeatherByCity(city);
    }
});

// Fetch weather by city name
function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Fetch weather by user's current location
function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByLocation(lat, lon);
            },
            error => {
                alert('Unable to retrieve your location. Please enter a city name.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser. Please enter a city name.');
    }
}

// Display weather information on the webpage
function displayWeather(data) {
    const { name, sys, weather, main, wind } = data;
    const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherInfo.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <img src="${weatherIcon}" alt="${weather[0].description}">
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
    weatherInfo.style.display = 'block';
}

// Initialize app by fetching weather for user's location
window.addEventListener('load', () => {
    getUserLocation();
});
