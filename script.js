const API_KEY = "6ff73af49e69a76340c66da03134ff5d";  // Replace with your OpenWeatherMap API key
const defaultCities = ["Delhi", "Mumbai", "Bangalore"];

function createCard(data) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <p class="city">${data.name}</p>
    <p class="weather">${data.weather[0].main}</p>
    <svg class="weather" width="50px" height="50px" viewBox="0 0 100 100" xml:space="preserve">
      <image width="100" height="100" href="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </svg>
    <p class="temp">${Math.round(data.main.temp)}°C</p>
    <div class="minmaxContainer">
      <div class="min">
        <p class="minHeading">Min</p>
        <p class="minTemp">${Math.round(data.main.temp_min)}°</p>
      </div>
      <div class="max">
        <p class="maxHeading">Max</p>
        <p class="maxTemp">${Math.round(data.main.temp_max)}°</p>
      </div>
    </div>
  `;
  document.getElementById("weatherCards").appendChild(card);
}

function fetchWeather(city) {
  const cityExists = Array.from(document.querySelectorAll(".card .city"))
    .some(c => c.textContent.toLowerCase() === city.toLowerCase());

  if (cityExists) {
    alert("City already displayed!");
    return;
  }

  document.getElementById("loader").style.display = "block";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("loader").style.display = "none";
      if (data.cod === 200) {
        createCard(data);
      } else {
        alert("City not found!");
      }
    });
}

function searchWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    fetchWeather(city);
    document.getElementById("cityInput").value = "";
  }
}

window.onload = () => {
  defaultCities.forEach(city => fetchWeather(city));
};
