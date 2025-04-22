document.addEventListener("DOMContentLoaded", () => {
  const { OPENWEATHER_API_KEY, environment } = window.SiteConfig;

  console.log("Environment:", environment);
  if (OPENWEATHER_API_KEY) {
    async function fetchWeatherData(lat, lon) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        if (!res.ok) {
          throw Error("Weather data not available");
        }
        const data = await res.json();

        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const temp = Math.round(data.main.temp);
        const city = data.name;

        document.getElementById("weather").innerHTML = `
            <img src="${iconUrl}" />
            <p class="weather-temp">${temp}ºc</p>
            <p class="weather-city">${city}</p>
        `;
      } catch (err) {
        console.error("Error fetching weather data:", err);
        document.getElementById("weather").innerHTML = `
            <p>Unable to retrieve weather data</p>
        `;
      }
    }

    function getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherData(lat, lon);
        },
        async (error) => {
          console.error("Geolocation error:", error);
          console.log("Attempting to retrieve location using IP address...");
          try {
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            const lat = data.latitude;
            const lon = data.longitude;
            fetchWeatherData(lat, lon);
          } catch (err) {
            console.error("Error fetching IP-based location data:", err);
            document.getElementById("weather").innerHTML = `
                    <p>Unable to retrieve location data</p>
                `;
          }
        }
      );
    }
    getLocation();
  } else {
    console.error(
      "API key is not defined. Weather data will not be displayed."
    );
    document.getElementById("weather").innerHTML = `
        <p>Weather data is not available</p>
    `;
  }
});
