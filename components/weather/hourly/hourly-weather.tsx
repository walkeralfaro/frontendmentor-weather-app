import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import groupWeatherByDay from "@/lib/groupWeatherByDay"
import { celciusToFahrenheit } from "@/lib/utils"
import { getWeatherIconPath } from "@/lib/weatherIconMap"
import { Hourly } from "@/schema"
import { useUnitStore } from "@/store/useUnitStore"
import Image from "next/image"
import { useState } from "react"

export default function HourlyWeather({ hourly }: { hourly: Hourly }) {
  const { temperatureUnit } = useUnitStore()
  const grouped = groupWeatherByDay(hourly)
  const days = Object.keys(grouped)
  const [selectedDay, setSelectedDay] = useState(days[0])

  return (
    <div className="p-4">

      <div className="bg-sidebar-accent dark:bg-card rounded-lg">
        <div className="flex justify-between items-center p-4">

          <h4>Hourly forecast</h4>

          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="bg-card dark:bg-secondary">
              <SelectValue placeholder="Select a weekday" />
            </SelectTrigger>
            <SelectContent align="end">
              {
                days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>

        </div>

        <ScrollArea className="h-144">
          <div className="space-y-3 p-4">

            {
              grouped[selectedDay].map((day, index) => {
                const iconPath = getWeatherIconPath(day.code)

                const temperature = celciusToFahrenheit(day.temperature, temperatureUnit)

                return (
                  <div key={index} className="flex justify-between items-center bg-card dark:bg-secondary p-2 pr-3 border rounded-lg ">
                    <div className="flex gap-1 items-center">
                      <div className="relative aspect-square w-10">
                        <Image src={iconPath} alt="Weather icon" fill priority />
                      </div>

                      <div className="text-xl">{day.time}</div>

                    </div>
                    <div>{temperature}°</div>
                  </div>
                )
              }
              )}
          </div>
        </ScrollArea>
      </div>
    </div>

  )
}