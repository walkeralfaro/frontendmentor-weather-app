'use client'

import { useUnitStore } from "@/store/useUnitStore"
import { toFahrenheit, kmhToMph, mmToInch } from "@/lib/utils"
import { Current } from "@/schema"

export default function CurrentWeather({ current }: { current: Current | undefined }) {
  const { temperatureUnit, windUnit, precipitationUnit } = useUnitStore()

  if (!current) return null

  const temperature =
    temperatureUnit === "fahrenheit"
      ? toFahrenheit(current.temperature_2m)
      : current.temperature_2m

  const apparent =
    temperatureUnit === "fahrenheit"
      ? toFahrenheit(current.apparent_temperature)
      : current.apparent_temperature

  const wind =
    windUnit === "mph"
      ? kmhToMph(current.wind_speed_10m)
      : current.wind_speed_10m

  const precipitation =
    precipitationUnit === "in"
      ? mmToInch(current.precipitation)
      : current.precipitation

  return (
    <div className="p-4">
      <p>🌡️ Temp: {temperature.toFixed(1)}°{temperatureUnit === "fahrenheit" ? "F" : "C"}</p>
      <p>💨 Viento: {wind.toFixed(1)} {windUnit}</p>
      <p>💧 Humedad: {current.relative_humidity_2m}%</p>
      <p>☔ Precipitación: {precipitation.toFixed(2)} {precipitationUnit}</p>
    </div>
  )
}
