'use client'

import { City, Current, Daily, Hourly } from "@/schema"
import { fetchWeather } from "@/lib/weather"
import { useEffect, useState } from "react"
import { SearchForm } from "@/components/search/search-form"
import CurrentWeather from "@/components/weather/current/current-weather"
import Header from "./header"
import DailyWeather from "../weather/daily/daily-weather"
import HourlyWeather from "../weather/hourly/hourly-weather"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function AppWeather() {
  const [localCity, setLocalCity] = useState<City | null>(null)
  const [searchedCity, setSearchedCity] = useState<City | null>(null)
  const [current, setCurrent] = useState<Current | undefined>()
  const [daily, setDaily] = useState<Daily | undefined>()
  const [hourly, setHourly] = useState<Hourly | undefined>()

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
    setDaily(weather.daily)
    setHourly(weather.hourly)
  }

  // search local city - IP - browser
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/")

        // Si la API responde con error (429, 500, etc.)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()

        // Si la API responde pero no tiene coordenadas
        if (!data.latitude || !data.longitude) throw new Error("Whitout coords")

        const detectedCity: City = {
          id: Math.floor(data.latitude) - Math.floor(data.longitude),
          name: data.city,
          country: data.country_name,
          admin1: data.region,
          latitude: data.latitude,
          longitude: data.longitude,
        }

        setLocalCity(detectedCity)
        await handleCitySearch(detectedCity)
      } catch (error) {
        console.warn("Error to detect IP direction:", error)

        // 🔁 Fallback: ubicación por defecto
        const fallbackCity: City = {
          id: 1,
          name: "Lima",
          country: "Peru",
          admin1: "Lima",
          latitude: -12.0464,
          longitude: -77.0428,
        }

        setLocalCity(fallbackCity)
        await handleCitySearch(fallbackCity)
      }
    }

    getUserLocation()
  }, [])

  return (
    <>
      <div className="font-dm-sans">

        <Header />

        <div className="container mx-auto max-w-3xl p-10 md:pb-5 md:pt-8">
          <h1 className="text-5xl/15 font-bricolage-grotesque text-center">How's the sky looking today?</h1>
        </div>

        <div className="container mx-auto max-w-2xl p-4 text-center">
          <div className="md:flex md:justify-between md:items-center md:gap-4">
            <SearchForm onSelectCity={(city) => handleCitySearch(city)} localCity={localCity} />
            <Button className="w-[330] sm:w-[375] mt-2 text-xl p-6 cursor-pointer md:mt-0 md:w-[100]" onClick={() => handleCitySearch(searchedCity!)}>Search</Button>
          </div>
        </div>

        <div className="md:flex md:container md:mx-auto md:max-w-6xl">

          <div className="grow">
            <CurrentWeather current={current} searchedCity={searchedCity} />
            <DailyWeather daily={daily} />
          </div>

          {hourly ? (
            <HourlyWeather hourly={hourly} />
          ) : (
            <div className="p-4 md:w-[372]">
              <div className="bg-sidebar-accent dark:bg-card rounded-lg">
                <div className="flex justify-between items-center p-4">
                  <h4>Hourly forecast</h4>
                  <Select value="">
                    <SelectTrigger className="bg-card dark:bg-secondary">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="--"></SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="h-144">
                  <div className="space-y-3 p-4"></div>
                </ScrollArea>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
