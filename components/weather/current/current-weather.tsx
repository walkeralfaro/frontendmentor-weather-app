'use client'

import { useUnitStore } from "@/store/useUnitStore"
import { kmhToMph, mmToInch, formatDate, celciusToFahrenheit } from "@/lib/utils"
import { City, Current } from "@/schema"
import { getWeatherIconPath } from "@/lib/weatherIconMap"
import Image from "next/image"
import CurrentCard from "./current-card"

export default function CurrentWeather({
  current,
  searchedCity,
}: {
  current: Current | undefined
  searchedCity?: City | null
}) {
  const { temperatureUnit, windUnit, precipitationUnit } = useUnitStore()

  const isLoading = !current

  if (isLoading) {
    // Mismo espacio visual pero sin contenido visible
    return (
      <main className="container mx-auto max-w-6xl p-4">
        <div className="bg-card rounded-2xl py-10 px-6 aspect-343/286 flex flex-col justify-center items-center">
          <p className="animate-pulse text-lg opacity-70">Loading...</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <CurrentCard title="Feels Like" units={temperatureUnit === "fahrenheit" ? "°F" : "°C"} />
          <CurrentCard title="Humidity" units="%" />
          <CurrentCard title="Wind" units={windUnit} />
          <CurrentCard title="Precipitation" units={precipitationUnit} />
        </div>
      </main>
    )
  }

  // Si ya hay datos, renderiza normalmente
  const iconPath = getWeatherIconPath(current.weather_code)
  const temperature = celciusToFahrenheit(current.temperature_2m, temperatureUnit)
  const apparent = celciusToFahrenheit(current.apparent_temperature, temperatureUnit)
  const wind = kmhToMph(current.wind_speed_10m, windUnit)
  const precipitation = mmToInch(current.precipitation, precipitationUnit)

  return (
    <main className="container mx-auto max-w-6xl p-4">
      {/* today temp - location - day */}
      <div className="bg-[url(/bg-today-small.svg)] bg-cover bg-no-repeat bg-center py-10 px-6 aspect-[343/286] flex flex-col justify-between">
        <div className="flex flex-col gap-3 items-center">
          <h2 className="text-3xl">
            {searchedCity?.name}
            {', '}
            {searchedCity?.country}
          </h2>
          <p className="text-lg font-light">{formatDate(current.time)}</p>
        </div>

        <div className="flex items-center justify-around">
          <div className="relative w-20 aspect-square">
            <Image src={iconPath} alt="Weather icon" fill priority />
          </div>
          <p className="text-8xl font-black italic">
            {temperature.toFixed(0)}°
            <span className="text-4xl">
              {temperatureUnit === "fahrenheit" ? "F" : "C"}
            </span>
          </p>
        </div>
      </div>

      {/* current weather */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <CurrentCard
            title="Feels Like"
            value={apparent}
            units={temperatureUnit === "fahrenheit" ? "°F" : "°C"}
          />
          <CurrentCard title="Humidity" value={current.relative_humidity_2m} units="%" />
          <CurrentCard title="Wind" value={wind} units={windUnit} />
          <CurrentCard title="Precipitation" value={precipitation} units={precipitationUnit} />
        </div>
      </div>
    </main>
  )
}
