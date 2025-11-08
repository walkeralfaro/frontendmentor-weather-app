'use client'

import { useUnitStore } from "@/store/useUnitStore"
import { toFahrenheit, kmhToMph, mmToInch, formatDate } from "@/lib/utils"
import { City, Current } from "@/schema"
import { getWeatherIconPath } from "@/lib/weatherIconMap"
import Image from "next/image"

export default function CurrentWeather({ current, searchedCity }: { current: Current | undefined, searchedCity?: City | null }) {
  const { temperatureUnit, windUnit, precipitationUnit } = useUnitStore()

  if (!current) return null

  const iconPath = getWeatherIconPath(current.weather_code)

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
    <>
      {/* <div className="p-4">
        <p>🌡️ Temp: {apparent.toFixed(1)}°{temperatureUnit === "fahrenheit" ? "F" : "C"}</p>
        <p>💨 Viento: {wind.toFixed(1)} {windUnit}</p>
        <p>💧 Humedad: {current.relative_humidity_2m}%</p>
        <p>☔ Precipitación: {precipitation.toFixed(2)} {precipitationUnit}</p>
      </div> */}


      <main className="container mx-auto max-w-6xl p-4">
        {/* today temp - location - day */}
        <div className=" bg-[url(/bg-today-small.svg)] bg-cover bg-no-repeat bg-center py-10 px-6 aspect-343/286 flex flex-col justify-between">

          <div className="flex flex-col gap-3 items-center">
            <h2 className="text-3xl">{searchedCity?.name}{', '}{searchedCity?.country}</h2>
            <p className="text-lg font-light">{formatDate(current.time)}</p>
          </div>

          <div className="flex items-center justify-around">
            <div className="relative w-20 aspect-square">

              <Image
                src={iconPath} alt="Weather icon" fill priority
              />
            </div>
            <p className="text-8xl font-black italic">{temperature.toFixed(0)}°<span className="text-4xl">{temperatureUnit === "fahrenheit" ? "F" : "C"}</span></p>
          </div>

        </div>

        {/* current weather */}
        <div>


        </div>
      </main>
    </>
  )
}
