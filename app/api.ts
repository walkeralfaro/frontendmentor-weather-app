import axios from "axios"
import { citiesResponseSchema } from "@/schema"
import { fetchWeatherApi } from "openmeteo"

export const fetchCities = async (query: string) => {
  try {
    const res = await axios.get("https://geocoding-api.open-meteo.com/v1/search", { params: { name: query } })

    const parsed = citiesResponseSchema.safeParse(res.data)

    if (!parsed.success) {
      console.warn("Validation error: ", parsed.error.issues)
      return []
    }

    return parsed.data.results
  } catch (error) {
    console.error("Error searching cities: ", error)
    return []
  }
}

export const fetchWeather = async (latitude: number, longitude: number) => {
  try {
    const params = {
      latitude,
      longitude,
      // Pedimos tanto datos horarios como diarios:
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation",
        "apparent_temperature", // "feels like"
        "wind_speed_10m"
      ],
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "weather_code"
      ],
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "wind_speed_10m"
      ],
      timezone: "auto",
    }

    const url = "https://api.open-meteo.com/v1/forecast"
    const responses = await fetchWeatherApi(url, params)
    const response = responses[0]

    const utcOffsetSeconds = response.utcOffsetSeconds()

    const current = response.current()!
    const hourly = response.hourly()!
    const daily = response.daily()!

    // Procesamos datos actuales
    const currentData = {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      precipitation: current.variables(3)!.value(),
      wind_speed_10m: current.variables(4)!.value(),
    }

    // Procesamos datos horarios
    const hourlyData = {
      time: Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      relative_humidity_2m: hourly.variables(1)!.valuesArray(),
      precipitation: hourly.variables(2)!.valuesArray(),
      wind_speed_10m: hourly.variables(3)!.valuesArray(),
      apparent_temperature: hourly.variables(4)!.valuesArray(),
    }

    // Procesamos datos diarios
    const dailyData = {
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m_max: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      precipitation_sum: daily.variables(2)!.valuesArray(),
      weather_code: daily.variables(3)!.valuesArray(),
    }

    return {
      latitude: response.latitude(),
      longitude: response.longitude(),
      elevation: response.elevation(),
      timezone: response.timezone(),
      timezoneAbbreviation: response.timezoneAbbreviation(),
      hourly: hourlyData,
      daily: dailyData,
      current: currentData,
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return null
  }
}