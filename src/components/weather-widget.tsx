"use client"

import { useEffect, useState } from "react"

interface WeatherData {
  icon: string
  temp: number
  city: string
}

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

    const fetchWeatherData = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`,
        )

        if (!res.ok) {
          throw Error("Weather data not available")
        }

        const data = await res.json()
        setWeatherData({
          icon: data.weather[0].icon,
          temp: Math.round(data.main.temp),
          city: data.name,
        })
      } catch (err) {
        console.error("Error fetching weather data:", err)
        setError("Unable to retrieve weather data.")
      }
    }

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            fetchWeatherData(lat, lon)
          },
          async (error) => {
            console.error("Geolocation error:", error)
            try {
              const res = await fetch("https://ipapi.co/json/")
              const data = await res.json()
              const lat = data.latitude
              const lon = data.longitude
              fetchWeatherData(lat, lon)
            } catch (err) {
              console.error("Error fetching IP-based location data:", err)
              setError("Unable to retrieve location data.")
            }
          },
        )
      } else {
        setError("Geolocation not supported.")
      }
    }

    getLocation()
  }, [])

  if (error) {
    return (
      <div className="weather-widget">
        <p>{error}</p>
      </div>
    )
  }

  if (!weatherData) {
    return (
      <div className="weather-widget">
        <p>Loading weather data...</p>
      </div>
    )
  }

  return (
    <div className="weather-widget">
      <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather icon" />
      <p className="weather-temp">{weatherData.temp}°C</p>
      <p className="weather-city">{weatherData.city}</p>
    </div>
  )
}
