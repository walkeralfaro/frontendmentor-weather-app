'use client'

import { City, Current } from "@/schema"
import { SearchForm } from "./SearchForm"
import { fetchWeather } from "@/app/api"
import { useEffect, useState } from "react"
import CurrentWeather from "../weather/current-weather"
import { UnitsMenu } from "../weather/units-menu"

export default function Search() {
  const [localCity, setLocalCity] = useState<City | null>(null)
  const [current, setCurrent] = useState<Current>()

  const handleCitySearch = async (city: City) => {
    console.log("Ciudad seleccionada:", city)

    const weather = await fetchWeather(city.latitude, city.longitude)

    if (!weather) {
      console.error("Error to get weather.")
      return
    }

    console.log("Datos del clima:", weather)
    setCurrent(weather.current)
  }

 useEffect(() => {
    const getUserLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/")
        const data = await res.json()

        if (!data.latitude || !data.longitude) return

        const detectedCity: City = {
          id: ( Math.floor(data.latitude) - Math.floor(data.longitude)),
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
      <div className="font-bricolage-grotesque">
        <UnitsMenu />
        <SearchForm onSelectCity={(city) => handleCitySearch(city)} localCity={localCity}/>
        <CurrentWeather current={current}/>
      </div>
    </>
  )
}
