import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { celciusToFahrenheit } from "@/lib/utils"
import { getWeatherIconPath } from "@/lib/weatherIconMap"
import { Daily } from "@/schema"
import { useUnitStore } from "@/store/useUnitStore"
import Image from "next/image"

export default function DailyWeather({ daily }: { daily: Daily }) {
  const { temperatureUnit } = useUnitStore()

  return (
    <>
      <section className="container mx-auto max-w-6xl p-4">
        <h3 className="mb-4">Daily forecast</h3>

        <div className="grid grid-cols-3 gap-4">
          {
            daily.time.map((day, index) => {

              const weekday = new Date(day).toLocaleDateString("en-US", {
                weekday: "short",
                timeZone: "UTC",
              })
              const max = celciusToFahrenheit(daily.temperature_2m_max[index], temperatureUnit)
              const min = celciusToFahrenheit(daily.temperature_2m_min[index], temperatureUnit)
              const code = daily.weather_code[index]
              const iconPath = getWeatherIconPath(code)

              return (

                <div key={index}>
                  <Card className="gap-0 py-4">
                    <CardHeader>
                      <CardTitle className="text-center">
                        {weekday}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">

                      <div className="px-4">
                        <div className="relative aspect-square w-full">
                          <Image src={iconPath} alt="Weather icon" fill priority />
                        </div>
                      </div>

                      <div className="flex justify-between px-3 font-light">
                        <p>{max}°</p>
                        <p>{min}°</p>
                      </div>

                    </CardContent>
                  </Card>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}