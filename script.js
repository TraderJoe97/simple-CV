// Weather Widget Functionality
const OPENWEATHER_API_KEY = "c0230d3c366ca1fa56593ce4222985d0"

async function fetchWeatherData(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`,
    )

    if (!res.ok) {
      throw Error("Weather data not available")
    }

    const data = await res.json()
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    const temp = Math.round(data.main.temp)
    const city = data.name

    document.getElementById("weather-widget").innerHTML = `
      <img src="${iconUrl}" alt="${data.weather[0].description}">
      <p class="weather-temp">${temp}°C</p>
      <p class="weather-city">${city}</p>
    `
  } catch (err) {
    console.error("Error fetching weather data:", err)
    document.getElementById("weather-widget").innerHTML = `
      <p>Unable to retrieve weather data</p>
    `
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        fetchWeatherData(lat, lon)
      },
      async (error) => {
        console.error("Geolocation error:", error)
        console.log("Attempting to retrieve location using IP address...")
        try {
          const res = await fetch("https://ipapi.co/json/")
          const data = await res.json()
          const lat = data.latitude
          const lon = data.longitude
          fetchWeatherData(lat, lon)
        } catch (err) {
          console.error("Error fetching IP-based location data:", err)
          document.getElementById("weather-widget").innerHTML = `
            <p>Unable to retrieve location data</p>
          `
        }
      },
    )
  } else {
    document.getElementById("weather-widget").innerHTML = `
      <p>Geolocation not supported</p>
    `
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      })
    }
  })
})

// Paper tilt effect on mouse move
const cvPaper = document.querySelector(".cv-paper")
const maxTilt = 1.5

document.addEventListener("mousemove", (e) => {
  if (!cvPaper) return

  const paperRect = cvPaper.getBoundingClientRect()
  const paperCenterX = paperRect.left + paperRect.width / 2
  const paperCenterY = paperRect.top + paperRect.height / 2

  const mouseX = e.clientX
  const mouseY = e.clientY

  const distanceX = (mouseX - paperCenterX) / (paperRect.width / 2)
  const distanceY = (mouseY - paperCenterY) / (paperRect.height / 2)

  const tiltX = -distanceY * maxTilt
  const tiltY = distanceX * maxTilt

  cvPaper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
})

// Reset tilt when mouse leaves the document
document.addEventListener("mouseleave", () => {
  if (!cvPaper) return
  cvPaper.style.transform = "perspective(1000px) rotateX(2deg) rotateY(0deg)"
})

// Initialize the weather widget
document.addEventListener("DOMContentLoaded", () => {
  getLocation()
})
