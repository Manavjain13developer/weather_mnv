const API_KEY = "6ff73af49e69a76340c66da03134ff5d";  // Replace with your OpenWeatherMap API key
const defaultCities = ["Delhi", "Mumbai", "Bangalore"];

function createCard(data) {
  const card = document.createElement("div");
  card.className = "card";

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  card.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="Weather Icon" />
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
  `;

  document.getElementById("weatherCards").appendChild(card);



  document.getElementById("weatherCards").appendChild(card);


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
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  document.getElementById("loader").style.display = "block";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("loader").style.display = "none";
      if (data.cod === 200) {
        createCard(data);
                cityInput.value = ""; // ✅ clear input here

      } else {
        alert("City not found!");
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      document.getElementById("loader").style.display = "none";
    });
}


window.onload = () => {
  defaultCities.forEach(city => fetchWeather(city));
};
