'use client'

import { City, Current } from "@/schema"
import { fetchWeather } from "@/lib/weather"
import { useEffect, useState } from "react"
import { UnitsMenu } from "@/components/weather/units-menu"
import { SearchForm } from "@/components/search/search-form"
import CurrentWeather from "@/components/weather/current-weather"
import Header from "./header"

export default function AppWeather() {
  const [localCity, setLocalCity] = useState<City | null>(null)
  const [searchedCity, setSearchedCity] = useState<City | null>(null)
  const [current, setCurrent] = useState<Current>()

  const handleCitySearch = async (city: City) => {
    console.log("Ciudad seleccionada:", city)

    setSearchedCity(city)

    const weather = await fetchWeather(city.latitude, city.longitude)

    if (!weather) {
      console.error("Error to get weather.")
      return
    }

    console.log("Datos del clima:", weather)
    setCurrent(weather.current)
  }

  // search local city - IP - browser
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/")
        const data = await res.json()

        if (!data.latitude || !data.longitude) return

        const detectedCity: City = {
          id: (Math.floor(data.latitude) - Math.floor(data.longitude)),
          name: data.city,
          country: data.country_name,
          admin1: data.region,
          latitude: data.latitude,
          longitude: data.longitude,
        }

        setLocalCity(detectedCity)
        await handleCitySearch(detectedCity)
      } catch (error) {
        console.error("Error al detectar ubicación por IP:", error)
      }
    }

    getUserLocation()
  }, [])

  return (
    <>
      <div className="font-dm-sans">
        <Header />
        <div className="container mx-auto max-w-3xl p-10">
          <h1 className="text-5xl/15 font-bricolage-grotesque text-center">How's the sky looking today?</h1>
        </div>
        <div className="text-center">
          <SearchForm onSelectCity={(city) => handleCitySearch(city)} localCity={localCity} />
        </div>

        <CurrentWeather current={current} searchedCity={searchedCity} />


      </div>
    </>
  )
}
